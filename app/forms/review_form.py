from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, TextAreaField, IntegerField, DateField, SelectField, FloatField
from wtforms.validators import DataRequired, Length, URL, Email, ValidationError

def review_length(form, field):
    # Checking if review length is correct
    text = field.data
    if len(text) > 500 or len(text) < 1:
        raise ValidationError('Review must be between 1 and 500 characters')

def rating_length(form, field):
    rating = field.data
    if rating > 10 or rating < 1:
        raise ValidationError('Rating must be between 1 and 10')

class ReviewForm(FlaskForm):
    review_body = StringField('Review', validators=[DataRequired(), review_length])
    rating = FloatField('Rating', validators=[DataRequired(), rating_length])
