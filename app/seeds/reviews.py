from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()

def seed_reviews():
    review1 = Review(
        review_body='This was a great anime!!', rating=8, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=1, user_id=2
    )
    review2 = Review(
        review_body='Love this show!!', rating=9, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=2, user_id=3
    )
    review3 = Review(
        review_body='Most epic movies ever!!', rating=9, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=3, user_id=1
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
