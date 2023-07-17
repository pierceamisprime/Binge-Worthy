import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { allPostsThunk } from "../../store/posts"
import CreateReviewModal from "../ReviewPage/CreateReview.Modal"
import OpenModalButton from "../OpenModalButton"

import '../LandingPage/LandingPage.css'
import { getAllCategoriesThunk } from "../../store/categories"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BookmarkButton from "../BookMarks"
import { getUserThunk } from "../../store/session"
import EditDeleteDrop from "../LandingPage/EditDeleteDropMenu"


const BookMarksPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const posts = Object.values(useSelector(state => state.posts))
    const actionPosts = posts.filter(post => post.category == 'Action/Adventure')
    const fantasyPosts = posts.filter(post => post.category == 'Fantasy')
    const scienceFicttionPosts = posts.filter(post => post.category == 'Science-fiction')
    const dramaPosts = posts.filter(post => post.category == 'Drama')
    const comedyPosts = posts.filter(post => post.category == 'Comedy')
    const horrorPosts = posts.filter(post => post.category == 'Horror')

    const bookmarks = user.user_bookmarks






    useEffect(() => {
        dispatch(allPostsThunk())
        dispatch(getAllCategoriesThunk())
        dispatch(getUserThunk(user?.id))
    }, [dispatch])

    if (!user) return <Redirect to="/" />;


    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 2,

        }
      };

      if (!bookmarks) return null;


    return (

        <div className="lp-posts-container">
            <div className="lp-category">

<h2>Bookmarks</h2>
            </div>


                        <Carousel className="lp-carousel"
        showDots={true}
        responsive={responsive}

        >
            {bookmarks.map(post => {
                // const isCurrentUser = post?.user?.id === user?.id;
                return (
                    <div className="lp-post" key={post.id}>
                         <div className="manage-buttons">
                            {/* <span className="lp-user">{post.user.username}</span> */}
                            {/* <NavLink className='lp-user' to={`/users/${post.user.id}`}>{post.user.username}</NavLink> */}
                            <div className="edit-dl-drop">
                            {/* {isCurrentUser ? (
                                    <EditDeleteDrop user={user} postId={post.id}
                                    /> */}

                                    {/* ) : */}
                                      <div className="like-button">
                                    <BookmarkButton sessionUser={user} post={post} />
                                  </div>
                                    </div>

                        </div>
                        <div className="title-rating">
                       <h2 className="lp-title">
                        {post.title}
                        </h2>
                        <div className="lp-rating-container">
                        <i class="fa-solid fa-face-smile fa-lg" style={{color: "#557e71"}}></i>
                        <i class="fa-solid fa-face-meh fa-lg" style={{color: "#557e71"}}></i>
                        <i class="fa-solid fa-face-frown fa-lg" style={{color: "#557e71"}}></i>
                        <span id="lp-rating">
                        {parseFloat(post.owner_rating).toFixed(1)}
                        </span>
                        </div>
                        </div>
                        <div className="lp-images-container">
                        <img className="lp-images" src={post.post_img}></img>

                        </div>
                        <div className="lp-review-watching-container">
                        <span id="lp-watching">
                        Watching On: {post.watching_on}
                        </span>
                        </div>
                        <div className="lp-other-reviews">
                            <NavLink className='lp-other-reviews-link' to={`/posts/${post.id}/reviews`} style={{ textDecoration: 'none' }}>Other Reviews</NavLink>
                        </div>
                    </div>
                )
            })}
          </Carousel>

          </div>
    )}

export default BookMarksPage
