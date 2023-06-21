from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms.profile_pic import ProfilePicForm
from .routes.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

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
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

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
