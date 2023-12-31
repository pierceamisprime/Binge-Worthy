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
    Fantasy = Category(
        type='Fantasy'
    )

    db.session.add(Action_Adventure)
    db.session.add(Comedy)
    db.session.add(Horror)
    db.session.add(Drama)
    db.session.add(Science_fiction)
    db.session.add(Fantasy)
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
