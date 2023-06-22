from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()

def seed_reviews():
    review1 = Review(
        review_body='This was a great anime!! Ichigo is unmatched.', rating=8.5, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=1, user_id=2
    )
    review2 = Review(
        review_body='Love this show!! I agree season 8 is not recommended.', rating=9.5, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=2, user_id=3
    )
    review3 = Review(
        review_body='Everyday I wake up and contemplate rewatching this trilogy.', rating=10.0, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=3, user_id=4
    )
    review4 = Review(
        review_body='These movies need to end.', rating=5.0, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=4, user_id=5
    )
    review5 = Review(
        review_body='This show was good until season 3...', rating=7.5, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=5, user_id=6
    )
    review6 = Review(
        review_body='Love this show! Henry Cavill is so good!', rating=9.2, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=6, user_id=7
    )
    review7 = Review(
        review_body='Possibly the best action movies ever??', rating=9.5, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=7, user_id=8
    )
    review8 = Review(
        review_body='This is my comfort show, never fails to make me laugh.', rating=9.0, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=8, user_id=9
    )
    review9 = Review(
        review_body='One of the funniest shows I have ever seen!', rating=9.1, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=9, user_id=10
    )
    review10 = Review(
        review_body='Funny show. Bring back Joe!!!!!', rating=8.3, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=10, user_id=1
    )
    review11 = Review(
        review_body='Did not care for it...', rating=6.0, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=11, user_id=2
    )
    review12 = Review(
        review_body='This show is crazy!', rating=9.2, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=12, user_id=3
    )
    review13 = Review(
        review_body='This movie is far better than the rest of them.', rating=9.0, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=13, user_id=4
    )
    review14 = Review(
        review_body='Loved this movie, actually a good story!', rating=9.6, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=14, user_id=5
    )
    review15 = Review(
        review_body='This show is alright, did not hook me until the end.', rating=7.5, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=15, user_id=6
    )
    review16 = Review(
        review_body='Such an amazing show. The writing cannot be beat.', rating=9.4, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=16, user_id=7
    )
    review17 = Review(
        review_body='Teron did an amazing job in this. Highly recommend.', rating=9.5, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=17, user_id=8
    )
    review18 = Review(
        review_body='Elizabeth Olsen is amazing in this!!', rating=9.5, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=18, user_id=9
    )
    review19 = Review(
        review_body='Heartbreaking watch. Amazing story with amazing chracters.', rating=9.5, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=19, user_id=10
    )
    review20 = Review(
        review_body='This show was a let down.', rating=6.0, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=20, user_id=1
    )
    review21 = Review(
        review_body='Cannot stop watching this!!', rating=9.2, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=21, user_id=2
    )
    review22 = Review(
        review_body='This show is weird but awesome. Recommend if you love animation.', rating=9.1, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=22, user_id=3
    )
    review23 = Review(
        review_body='Super interesting show!', rating=9.2, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=23, user_id=4
    )
    review24 = Review(
        review_body='This film did ineed blow my mind!', rating=9.3, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=24, user_id=5
    )
    review25 = Review(
        review_body='Christoper Nolan does not miss.', rating=9.2, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=25, user_id=6
    )
    review26 = Review(
        review_body='Honestly expected more from this show, book was better.', rating=7.5, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=26, user_id=7
    )
    review27 = Review(
        review_body='This show was a breath of fresh air!', rating=8.5, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=27, user_id=8
    )
    review28 = Review(
        review_body='This movie does not get the respect it deserves.', rating=9.0, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=28, user_id=9
    )
    review29 = Review(
        review_body='Top 2 and it aint 2!', rating=10.0, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=29, user_id=10
    )
    review30 = Review(
        review_body='Really love this show!', rating=8.8, created_at=fake.date_between(start_date='-5y', end_date='today'), post_id=30, user_id=1
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)
    db.session.add(review25)
    db.session.add(review26)
    db.session.add(review27)
    db.session.add(review28)
    db.session.add(review29)
    db.session.add(review30)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
