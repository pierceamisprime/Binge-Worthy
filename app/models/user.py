from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin



follows = db.Table(
    'follows',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_is', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('following', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),

    db.UniqueConstraint('user_is', 'following')
)
if environment == "production":
    follows.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(2000), default='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = db.relationship('Post', back_populates='user')
    review = db.relationship('Review', back_populates='user')

    user_bookmarks = db.relationship(
        "Post",
        secondary='bookmarks',
        back_populates="post_bookmarks",
        cascade="delete, all",
    )


    following = db.relationship('User', secondary='follows',
                                primaryjoin=follows.c.user_is == id,
                                secondaryjoin=follows.c.following == id,
                                backref='friends')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'user_bookmarks': [bookmark.to_dict_bookmarks() for bookmark in self.user_bookmarks],
            'is_following': {}
        }
