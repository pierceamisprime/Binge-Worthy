from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demolition', last_name='User', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie23', first_name='Marnie', last_name='Smith', email='marnie@aa.io', password='password')
    tien = User(
        username='trennytien', first_name='Tien', last_name='Hoang', email='Tien@aa.io', password='password')
    raoul = User(
        username='Isavelives22', first_name='Raoul', last_name='Andalis', email='Raoul@aa.io', password='password')
    jenna = User(
        username='smartypants45', first_name='Jenna', last_name='Godfrey', email='Jenna@aa.io', password='password')
    taylor = User(
        username='therealtaylor12', first_name='Taylor', last_name='Mcclerin', email='Taylor@aa.io', password='password')
    jay = User(
        username='goat23', first_name='Jay', last_name='Levin', email='Jay@aa.io', password='password')
    ben = User(
        username='optimusprime6', first_name='Ben', last_name='Wilson', email='Ben@aa.io', password='password')
    katie = User(
        username='theQ', first_name='Katie', last_name='Pee', email='Katie@aa.io', password='password')
    pj = User(
        username='KwargMaster', first_name='PJ', last_name='Singh', email='PJ@aa.io', password='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(tien)
    db.session.add(raoul)
    db.session.add(jenna)
    db.session.add(taylor)
    db.session.add(jay)
    db.session.add(ben)
    db.session.add(katie)
    db.session.add(pj)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
