from app.models import db, Post, environment, SCHEMA, User
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()

def seed_posts():


    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)
    user6 = User.query.get(6)
    user7 = User.query.get(7)
    user8 = User.query.get(8)
    user9 = User.query.get(9)
    user10 = User.query.get(10)


    post1 = Post(
        title='Bleach', owner_review='Amazing show!!! Top tier anime and my favorite of all.', owner_rating=9.1, watching_on='Hulu', post_img='https://upload.wikimedia.org/wikipedia/en/7/72/Bleachanime.png', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Action/Adventure', user_id=1, post_bookmarks = [user1, user3, user6, user8],
    )
    post2 = Post(
        title='Game of Thrones', owner_review='Dragons, swords, and more...! Just dont watch season 8...', owner_rating=9.5, watching_on='Max', post_img='https://flxt.tmsimg.com/assets/p8553063_b_v13_ax.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Fantasy', user_id=2, post_bookmarks = [user4, user3, user6, user8]
    )
    post3 = Post(
        title='Lord of the Rings', owner_review='Best trilogy of all time!!! Spend more than your day watching these 3 glorius films', owner_rating=10, watching_on='Max', post_img='https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Fantasy', user_id=3, post_bookmarks = [user1, user3, user6, user8]
    )
    post4 = Post(
        title='FAST X', owner_review='Its all about family! There cant possibly be another one coming out right?', owner_rating=8.1, watching_on='other', post_img='https://m.media-amazon.com/images/M/MV5BNzZmOTU1ZTEtYzVhNi00NzQxLWI5ZjAtNWNhNjEwY2E3YmZjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1000_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Action/Adventure', user_id=4, post_bookmarks = [user1, user3, user5, user10]
    )
    post5 = Post(
        title='Vikings', owner_review='Super epic show! All hail Ragnar!!! Highly recommend watching', owner_rating=8.5, watching_on='Amazon', post_img='https://flxt.tmsimg.com/assets/p9155926_b_v10_au.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Action/Adventure', user_id=5, post_bookmarks = [user2, user3, user6, user8]
    )
    post6 = Post(
        title='The Witcher', owner_review='Pretty good adaptation from the game. The score is awesome and the fight choreography is on point!', owner_rating=8.2, watching_on='Netflix', post_img='https://flxt.tmsimg.com/assets/p17580215_b_v13_ac.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Action/Adventure', user_id=6, post_bookmarks = [user5, user7, user8]
    )
    post7 = Post(
        title='John Wick', owner_review='I counted atleast 100 headshots. Great score, action, and set design! Follow it up with 2, 3, and 4!', owner_rating=10, watching_on='Hulu', post_img='https://www.themoviedb.org/t/p/original/sxeZgvv6mLZeGQMK1rvK3hw2W07.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Action/Adventure', user_id=7
    )
    post8 = Post(
        title='The Office', owner_review='Bears, beets, battlestar galactica!!!!!!!!!! Dwight is top 2 funniest characters and he aint 2.', owner_rating=10, watching_on='Netflix', post_img='https://images.hola.com/us/images/0266-117f1e1bfa6b-90b6fc2f2c37-1000/horizontal-1200/the-office-poster-with-steve-carell.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Comedy', user_id=8
    )
    post9 = Post(
        title='Rick & Morty', owner_review='Hilarious, clever, and must see tv!!', owner_rating=9.2, watching_on='AppleTv', post_img='https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_FMjpg_UX1000_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Comedy', user_id=9
    )
    post10 = Post(
        title='Impractical Jokers', owner_review='Super funny show about 4 friends pranking each other and others!!', owner_rating=8.5, watching_on='YoutubeTv', post_img='https://m.media-amazon.com/images/M/MV5BYTAzMmIwMWQtYjRjYy00NmM2LWIxYWUtY2NhYjMzZjc4ZGZmXkEyXkFqcGdeQXVyNDc3MzQ5Nzc@._V1_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Comedy', user_id=10
    )
    post11 = Post(
        title='Barry', owner_review='Bill Hader is hilarious in this! Instant binge.', owner_rating=9.2, watching_on='Max', post_img='https://m.media-amazon.com/images/I/41tZiLPG2uL._AC_UF894,1000_QL80_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Comedy', user_id=1
    )
    post12 = Post(
        title='Black Mirror', owner_review='Unique stories, both interesting and frightening.', owner_rating=8.7, watching_on='Netflix', post_img='https://flxt.tmsimg.com/assets/p8952681_b_v13_an.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Horror', user_id=2, post_bookmarks = [user1, user3, user6, user8]
    )
    post13 = Post(
        title='SAW', owner_review='This movie will make your skin crawl!', owner_rating=8.8, watching_on='Paramount+', post_img='https://m.media-amazon.com/images/I/41UHy1yVLqL._AC_UF894,1000_QL80_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Horror', user_id=3
    )
    post14 = Post(
        title='Insidious', owner_review='Super scary but so good! You may not sleep for awhile!', owner_rating=9.5, watching_on='YoutubeTv', post_img='https://m.media-amazon.com/images/M/MV5BMTYyOTAxMDA0OF5BMl5BanBnXkFtZTcwNzgwNTc1NA@@._V1_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Horror', user_id=4
    )
    post15 = Post(
        title='From', owner_review='This is show is so scary and intense, you wont be able to stop watching!', owner_rating=8.5, watching_on='Paramount+', post_img='https://m.media-amazon.com/images/M/MV5BNDQxOGI4ZjItM2NhZC00Y2FhLWEwZTAtZTc2MmJmNzY1MjViXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Horror', user_id=5
    )
    post16 = Post(
        title='Succession', owner_review='The writing, acting, and directing of this show is top tier!', owner_rating=9.7, watching_on='Max', post_img='https://flxt.tmsimg.com/assets/p15455205_b_v8_ab.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Drama', user_id=6
    )
    post17 = Post(
        title='Black Bird', owner_review='Cant believe this is based on a true story! Amazing watch and phenomenal acting.', owner_rating=9.0, watching_on='AppleTv', post_img='https://m.media-amazon.com/images/M/MV5BZjI3NjcyN2UtMGNhZC00YTYxLWJmOTQtNWI1ZGJmNjA4ZjY5XkEyXkFqcGdeQXVyNjEwNTM2Mzc@._V1_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Drama', user_id=7, post_bookmarks = [user1, user3, user6, user8]
    )
    post18 = Post(
        title='Love & Death', owner_review='This show is an amazing watch. Great writing and story.', owner_rating=8.5, watching_on='Paramount+', post_img='https://flxt.tmsimg.com/assets/p24098551_b_h8_aa.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Drama', user_id=8
    )
    post19 = Post(
        title='Sons of Anarchy', owner_review='Awesome show. The ending will break you.', owner_rating=8.8, watching_on='Netflix', post_img='https://flxt.tmsimg.com/assets/p186698_b_v9_ay.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Drama', user_id=9
    )
    post20 = Post(
        title='Severance', owner_review='One of the best shows I have watched this year. Highly recommend.', owner_rating=10, watching_on='AppleTv', post_img='https://m.media-amazon.com/images/M/MV5BMjkwZjcwMGQtNDAzOC00YjJiLThiYTgtNWU3ZjRiZmY2YzEzXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_FMjpg_UX1000_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Drama', user_id=10
    )
    post21 = Post(
        title='The 100', owner_review='Epic sci-fi show! Really interesting ideas.', owner_rating=8.2, watching_on='YoutubeTv', post_img='https://m.media-amazon.com/images/M/MV5BNjRiYTIzZmUtMTFkNS00ZTM0LWE4ODAtMDliMGE4NzM5ZjVlXkEyXkFqcGdeQXVyNDQ0MTYzMDA@._V1_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Science-fiction', user_id=1, post_bookmarks = [user1, user3, user6, user8]
    )
    post22 = Post(
        title='Love Death + Robots', owner_review='Super cool animated sci-fi show!', owner_rating=9.2, watching_on='Netflix', post_img='https://flxt.tmsimg.com/assets/p16594930_b_h9_ai.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Science-fiction', user_id=2
    )
    post23 = Post(
        title='The Lazarus Project', owner_review='One of the best shows this year! Great writing and script.', owner_rating=9.3, watching_on='Hulu', post_img='https://m.media-amazon.com/images/M/MV5BYzE4ODZhNTMtYTYyYi00N2JmLTllMDUtMjVlNDRiNTRiYWNhXkEyXkFqcGdeQXVyNDk3ODk4OQ@@._V1_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Science-fiction', user_id=3
    )
    post24 = Post(
        title='Arrival', owner_review='This movie will blow your mind. Another banger from Denis Villeneuve.', owner_rating=9.5, watching_on='Amazon', post_img='https://m.media-amazon.com/images/I/91UusfCtQaL._AC_UF894,1000_QL80_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Science-fiction', user_id=4
    )
    post25 = Post(
        title='Interstellar', owner_review='One of my favorites of all time. The score, the story, the direction, all amazing.', owner_rating=10, watching_on='YoutubeTv', post_img='https://thumbnails.cbsig.net/CBS_Production_Entertainment_VMS/2021/07/09/1919558723588/INST_SAlone_16_9_1920x1080_1887272_1920x1080.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Science-fiction', user_id=5
    )
    post26 = Post(
        title='Locke & Key', owner_review='Love this show! Awesome horror-fantasy story.', owner_rating=8.5, watching_on='Netflix', post_img='https://flxt.tmsimg.com/assets/p17699282_b_v13_ab.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Fantasy', user_id=6
    )
    post27 = Post(
        title='Loki', owner_review='This show was a fun watch. Cool story from the MCU.', owner_rating=8.7, watching_on='Disney+', post_img='https://cdn.marvel.com/content/1x/marvels_loki_cover.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Fantasy', user_id=7
    )
    post28 = Post(
        title='Prometheus', owner_review='Really cool take on the alien franchise.', owner_rating=9.1, watching_on='Paramount+', post_img='https://m.media-amazon.com/images/I/71aBXiXIBkL._AC_UF894,1000_QL80_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Fantasy', user_id=8
    )
    post29 = Post(
        title='Naruto Shippuden', owner_review='If anything is binge worthy, its this.', owner_rating=10, watching_on='Other', post_img='https://m.media-amazon.com/images/M/MV5BZGFiMWFhNDAtMzUyZS00NmQ2LTljNDYtMmZjNTc5MDUxMzViXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Fantasy', user_id=9
    )
    post30 = Post(
        title='The Umbrella Academy', owner_review='This show is fun, entertaining, and funny! Highly recommend.', owner_rating=9.0, watching_on='Netflix', post_img='https://flxt.tmsimg.com/assets/p16091715_b_v10_ae.jpg', created_at=fake.date_between(start_date='-5y', end_date='today'), category='Fantasy', user_id=10, post_bookmarks = [user1, user3, user6, user8]
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post13)
    db.session.add(post14)
    db.session.add(post15)
    db.session.add(post16)
    db.session.add(post17)
    db.session.add(post18)
    db.session.add(post19)
    db.session.add(post20)
    db.session.add(post21)
    db.session.add(post22)
    db.session.add(post23)
    db.session.add(post24)
    db.session.add(post25)
    db.session.add(post26)
    db.session.add(post27)
    db.session.add(post28)
    db.session.add(post29)
    db.session.add(post30)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
