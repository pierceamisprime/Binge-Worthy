from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Post
from ...models.user import User
from ...forms.posts_form import PostForm


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

@posts.route('')
# @login_required
def all_posts():

    posts = Post.query.order_by(Post.created_at.desc()).all()

    print('posts =========>', posts)

    post_list = [post.to_dict() for post in posts]

    res = {}

    for post in post_list:
        post_id = post['id']
        res[post_id] = post

    return res
