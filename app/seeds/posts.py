from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()

def seed_posts():
    post1 = Post(
        title='Bleach', owner_review='Amazing show!!!', owner_rating=9, watching_on='Hulu', post_img='https://upload.wikimedia.org/wikipedia/en/7/72/Bleachanime.png', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Action/Adventure', user_id=1
    )
    post2 = Post(
        title='Game of Thrones', owner_review='Epic battles!!!', owner_rating=8, watching_on='Max', post_img='https://flxt.tmsimg.com/assets/p8553063_b_v13_ax.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Fantasy', user_id=2
    )
    post3 = Post(
        title='Lord of the Rings', owner_review='Best trilogy of all time!!!', owner_rating=10, watching_on='Max', post_img='https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Fantasy', user_id=3
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
