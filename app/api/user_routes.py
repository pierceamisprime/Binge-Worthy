from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms.profile_pic import ProfilePicForm
from .routes.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from sqlalchemy import insert
from ..models.user import follows
from app.models import Post

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@user_routes.route('')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    # users = User.query.all()
    # return {'users': [user.to_dict() for user in users]}
    users = User.query.all()

    res = {}
    for user in users:
        user = user.to_dict()
        res[user['id']]= user

    return res


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
       #get all posts
    posts = Post.query.order_by(Post.created_at.desc()).all()

    my_posts = [post for post in posts if post.user.id == id]

    post_ids = [post.id for post in my_posts]
    # get current user
    user = User.query.get(id)


    post_list = [post.to_dict() for post in my_posts]


    user_dict = user.to_dict()
    # make dictionary to return
    res = {}
    res[user_dict['id']] = { 'is_following': {}, "posts": {} }
    # loop through edited posts list and flatten data
    for post in post_list:
        post_id = post['id']
        user_id = user_dict['id']
        res[user_id]['posts'][post_id] = post

    friends = user_dict['is_following']

    for friend in user.following:
        friend_id = friend.id
        friends[friend_id] = friend.to_dict()

    res[user_dict['id']]['is_following'] = friends


    # return as DICT
    return res


@user_routes.route('/<int:id>/friends', methods=["POST"])
@login_required
def follow_user(id):
    # save insertion into the follows table to variable
    relationship = insert(follows).values(user_is = current_user.id, following = id)
    # execute statement
    db.session.execute(relationship)
    # save to the db
    db.session.commit()

    return { "res": "user was followed" }




@user_routes.route('/<int:id>/friends', methods=["DELETE"])
@login_required
def unfollow_user(id):
    # get list of columns that satisfy filter
    user_is_res = list(db.session.query(follows).filter(follows.c.user_is == current_user.id))
    # another list of columns that satisfy filter
    following_res = list(db.session.query(follows).filter(follows.c.following == id))
    # loop through one list, find a match between the two lists, and delete it
    for instance in user_is_res:
        if instance in following_res:
            db.session.query(follows).filter(follows.c.id == instance[0]).delete(synchronize_session=False)

    # save to db
    db.session.commit()

    return {"res": "User was unfollowed"}

@user_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def user_profile_pic(id):

    form = ProfilePicForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        image = form.data['profile_pic']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if 'url' not in upload:
            return print('upload========', upload)


        user = User.query.get(id)

        file_delete = remove_file_from_s3(user.profile_pic)






        user.profile_pic = upload['url']

        db.session.commit()
        print('user==================', user.to_dict)
        return {'resPost':user.to_dict()}

    if form.errors:
        print('errors =======================>', form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
