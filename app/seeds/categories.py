from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    Action_Adventure = Category(
        type='Action/Adventure'
    )
    Comedy = Category(
        type='Comedy'
    )
    Horror = Category(
        type='Horror'
    )
    Drama = Category(
        type='Drama'
    )
    Science_fiction = Category(
        type='Science-fiction'
    )

    db.session.add(Action_Adventure)
    db.session.add(Comedy)
    db.session.add(Horror)
    db.session.add(Drama)
    db.session.add(Science_fiction)
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.category RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM category"))

    db.session.commit()
