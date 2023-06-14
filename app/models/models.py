from .db import db, environment, SCHEMA, add_prefix_for_prod
import os


environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(55), nullable=False)
    owner_review = db.Column(db.String(500), nullable=False)
    owner_rating = db.Column(db.Integer, nullable=False)
    watching_on = db.Column(db.String(55))
    category = db.Column(db.String(55))
    post_img = db.Column(db.String(500))
    created_at = db.Column(db.Date(), nullable=False)

    # category_type = db.Column(db.String(55), db.ForeignKey(add_prefix_for_prod('categories.type')), nullable=False)
    # category = db.relationship('Category', back_populates='posts')

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user = db.relationship('User', back_populates='posts')

    review = db.relationship('Review', back_populates='posts')

    def __repr__(self):
        return f'<User {self.user_id}, {self.user.username}, just posted! Post #{self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'owner_review': self.owner_review,
            'owner_rating': self.owner_rating,
            'watching_on': self.watching_on,
            'post_img': self.post_img,
            'category': self.category,
            # 'category': {
            #     'id': self.category.id,
            #     'type': self.category.type
            # },
            'user': {
                'id': self.user.id,
                'username': self.user.username,
                'first_name': self.user.first_name,
                'last_name': self.user.last_name,
                'email': self.user.email,
                'profile-pic': self.user.profile_pic
            }
        }


class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(55), nullable=False)

    # posts = db.relationship('Post', back_populates='category')

    def __repr__(self):
        return f'<Post {self.posts.id} is under category {self.type}'

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'posts': {}
        }

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_body = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date(), nullable=False)

    posts = db.relationship('Post', back_populates='review')
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)

    user = db.relationship('User', back_populates='review')
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    def __repr__(self):
        return f'<User {self.user_id} made review {self.id} on post {self.posts.id}'

    def to_dict(self):
        return {
            'id': self.id,
            'review_body': self.review_body,
            'rating': self.rating,
        }
