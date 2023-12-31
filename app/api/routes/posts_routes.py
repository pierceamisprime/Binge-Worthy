from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Post, Review
from ...models.user import User
from ...forms.posts_form import PostForm
from ...forms.review_form import ReviewForm
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3


posts = Blueprint("posts", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@posts.route("")
# @login_required
def all_posts():

    posts = Post.query.order_by(Post.created_at.desc()).all()

    # print('posts =========>', posts)

    post_list = [post.to_dict() for post in posts]

    res = {}

    for post in post_list:
        post_id = post['id']
        res[post_id] = post

    return res


@posts.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_post(id):
    post_to_delete = Post.query.get(id)

    file_delete = remove_file_from_s3(post_to_delete.post_img)

    if file_delete:
        db.session.delete(post_to_delete)
        db.session.commit()
        return {'message': 'Successfully deleted'}

    else:
        return 'File delete error!'


@posts.route('', methods=['POST'])
@login_required
def create_post():

    form = PostForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():


        image = form.data['post_img']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if 'url' not in upload:
            return print('upload=============',upload)



        selected_user = User.query.get(current_user.id)
        # print('formdata========', form.data['category_type'])
        result = Post(
            title = form.data['title'],
            owner_review = form.data['owner_review'],
            owner_rating = form.data['owner_rating'],
            watching_on = form.data['watching_on'],
            post_img = upload['url'],
            user = selected_user,
            category = form.data['category'],
            created_at = date.today()
        )
        db.session.add(result)
        db.session.commit()
        return {'resPost': result.to_dict()}

    if form.errors:
        print('errors =======================>', form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@posts.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_post(id):

    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]


    if form.validate_on_submit():

        image = form.data['post_img']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if 'url' not in upload:
            return print('upload=============',upload)

        post = Post.query.get(id)


        file_delete = remove_file_from_s3(post.post_img)

        # if file_delete:
        #     db.session.delete(post)
        #     db.session.commit()
        #     return {'message': 'Successfully deleted'}


        print('post============================>', post)

        post.title = form.data['title']
        post.owner_review = form.data['owner_review']
        post.owner_rating = form.data['owner_rating']
        post.watching_on = form.data['watching_on']
        post.post_img = upload['url']
        post.category = form.data['category']
        post.created_at = date.today()

        db.session.commit()
        return {'resPost': post.to_dict()}

    if form.errors:
        print('errors =======================>', form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@posts.route("/<int:id>/reviews", methods=["POST"])
@login_required
def create_review(id):

    form = ReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        selected_user = User.query.get(current_user.id)

        result = Review(
            review_body = form.data['review_body'],
            rating = form.data['rating'],
            created_at = date.today(),
            post_id = id,
            user = selected_user
        )
        db.session.add(result)
        db.session.commit()
        return {'resReview': result.to_dict()}

    if form.errors:
        print('errors =======================>', form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@posts.route("/<int:id>/bookmark", methods=['PUT'])
@login_required
def add_bookmark(id):
    post = Post.query.get(id)
    selected_user = User.query.get(current_user.id)

    # selected_user.user_bookmarks.append(post)
    post.post_bookmarks.append(selected_user)

    db.session.commit()

    return {'user': selected_user.to_dict()}

@posts.route("/<int:id>/bookmark", methods=['DELETE'])
@login_required
def delete_bookmark(id):
    post = Post.query.get(id)
    selected_user = User.query.get(current_user.id)

    # selected_user.user_bookmarks.remove(post)
    post.post_bookmarks.remove(selected_user)

    db.session.commit()

    return {'user': selected_user.to_dict()}
