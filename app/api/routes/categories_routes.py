from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Category

categories = Blueprint('categories', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@categories.route('')
@login_required
def all_categories():
    categories = Category.query.all()

    categories_list = [category.to_dict() for category in categories]

    res = {}

    for category in categories_list:
        category_id = category['id']
        res[category_id] = category

    return res
