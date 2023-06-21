import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { allPostsThunk } from "../../store/posts"
import CreateReviewModal from "../ReviewPage/CreateReview.Modal"
import OpenModalButton from "../OpenModalButton"
import EditDeleteDrop from "./EditDeleteDropMenu"
import './LandingPage.css'
import { getAllCategoriesThunk } from "../../store/categories"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const LandingPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const posts = Object.values(useSelector(state => state.posts))



    useEffect(() => {
        dispatch(allPostsThunk())
        dispatch(getAllCategoriesThunk())
    }, [dispatch])

    if (!user) return <Redirect to="/" />;


    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 2,

        }
      };


    return (

        <div className="lp-posts-container">

{/*
            {posts.toReversed().map(post => {
                const isCurrentUser = post.user.id === user.id;
                return (
                    <div className="lp-posts" key={post.id}>
                        <div className="manage-buttons">
                            <span className="lp-user">{post.user.username}</span>
                            <div className="edit-dl-drop">
                            {isCurrentUser && (
                                    <EditDeleteDrop user={user} postId={post.id}
                                    />

                                    )}
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
                        <span id="lp-review">
                        Review: {post.owner_review}
                        </span>
                        <span id="lp-watching">
                        Watching On: {post.watching_on}
                        </span>

                        </div>

                        <div className="lp-other-reviews">

                            <NavLink className='lp-other-reviews-link' to={`/posts/${post.id}/reviews`} style={{ textDecoration: 'none' }}>Other Reviews</NavLink>

                        </div>
                    </div>
                )
            })} */}
            <div className="lp-category">

<h2>All Binges</h2>
            </div>

                        <Carousel className="lp-carousel"
        showDots={true}
        responsive={responsive}

        >
            {posts.toReversed().map(post => {
                const isCurrentUser = post.user.id === user.id;
                return (
                    <div className="lp-post" key={post.id}>
                         <div className="manage-buttons">
                            <span className="lp-user">{post.user.username}</span>
                            <div className="edit-dl-drop">
                            {isCurrentUser && (
                                    <EditDeleteDrop user={user} postId={post.id}
                                    />

                                    )}
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
                        <span id="lp-review">
                        Review: {post.owner_review}
                        </span>
                        <span id="lp-watching">
                        Watching On: {post.watching_on}
                        </span>

                        </div>
                        {/* <span id="lp-category">
                        Category: {post.category}
                        </span> */}
                        <div className="lp-other-reviews">
                            {/* <button onClick={history.push(`/posts/${post.id}/reviews`)}>Other Reviews</button> */}
                            <NavLink className='lp-other-reviews-link' to={`/posts/${post.id}/reviews`} style={{ textDecoration: 'none' }}>Other Reviews</NavLink>
                            {/* <OpenModalButton
                                buttonText='Leave Review'
                                modalComponent={CreateReviewModal}
                            /> */}
                        </div>
                    </div>
                )
            })}
{/*
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div> */}
          </Carousel>

        </div>
    )

}

export default LandingPage
