from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, TextAreaField, IntegerField, DateField, SelectField, FloatField
from wtforms.validators import DataRequired, Length, URL, Email, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.routes.AWS_helpers import ALLOWED_EXTENSIONS

def review_length(form, field):
    # Checking if review length is correct
    text = field.data
    if len(text) > 500 or len(text) < 1:
        raise ValidationError('Review must be between 1 and 500 characters')

def title_length(form, field):
    title = field.data
    if len(title) > 500 or len(title) < 1:
        raise ValidationError('Title must be between 1 and 100 characters')

def rating_length(form, field):
    rating = field.data
    if rating > 10 or rating < 1:
        raise ValidationError('Rating must be number between 1 and 10')

class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), review_length])
    owner_review = TextAreaField("Review",validators=[DataRequired(), title_length])
    owner_rating = FloatField('Rating', validators=[DataRequired(), rating_length])
    watching_on = StringField('Watching On', validators=[DataRequired()])
    category = StringField('Category', validators=[DataRequired()])
    # post_img = StringField('Image')
    post_img = FileField('Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    created_at = DateField("Date")
    submit = SubmitField("Submit")
