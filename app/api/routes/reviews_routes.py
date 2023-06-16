from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Post, Review
from ...models.user import User
from ...forms.posts_form import PostForm
from ...forms.review_form import ReviewForm


reviews = Blueprint("reviews", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@reviews.route('')
@login_required
def all_reviews():

    reviews = Review.query.all()

    review_list = [review.to_dict() for review in reviews]

    res = {}

    for review in review_list:
        review_id = review['id']
        res[review_id] = review

    return res

@reviews.route("/<int:id>/update", methods=["PUT"])
@login_required
def create_review(id):

    form = ReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review = Review.query.get(id)

        review.review_body = form.data['review_body']
        review.rating = form.data['rating']
        review.created_at = date.today()


        db.session.commit()
        return {'resReview': review.to_dict()}

    if form.errors:
        print('errors =======================>', form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@reviews.route("/<int:id>/delete", methods=['DELETE'])
@login_required
def delete_review(id):
    review_to_delete = Review.query.get(id)
    db.session.delete(review_to_delete)
    db.session.commit()
    return {'message': 'Successfully deleted'}
