from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, TextAreaField, IntegerField, DateField, SelectField, FloatField
from wtforms.validators import DataRequired, Length, URL, Email, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.routes.AWS_helpers import ALLOWED_EXTENSIONS



class ProfilePicForm(FlaskForm):
    profile_pic = FileField('Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))], default='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
