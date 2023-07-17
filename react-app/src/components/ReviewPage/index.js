import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { allPostsThunk } from "../../store/posts"
import { allReviewsThunk } from "../../store/reviews"
import OpenModalButton from "../OpenModalButton"
import CreateReviewModal from "./CreateReview.Modal"
import EditDeleteReviewDrop from "./EditDeleteReviewDrop"
import './ReviewPage.css'


const ReviewPage = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const posts = useSelector(state => state.posts)
    const post = posts[postId]
    const reviews = Object.values(useSelector(state => state.reviews))
    const postsReviews = reviews.filter(review => review.post_id === post?.id)
    const user = useSelector(state => state.session.user)
    const userReviews = postsReviews.filter(review => user?.id === review.user.id)
    // const post = posts.filter()



    useEffect(() => {
        dispatch(allPostsThunk())
        dispatch(allReviewsThunk())
    }, [dispatch])

    let avgRating = 0
    postsReviews.forEach(review => {
        avgRating += review.rating




    });



   avgRating = avgRating / postsReviews.length




    return (
        <div className="review-page-container">
            <div className="review-post-recap">
                <div className="rp-user-c">

                        {/* <span className="rp-user">{post?.user?.username}</span> */}
                        <NavLink className='rp-user' to={`/users/${post?.user?.id}`}>{post.user.username}</NavLink>
                </div>
            <h2 className="review-title">
                        {post?.title}
                        </h2>
                        <img className="rp-images" src={post?.post_img}></img>
                        <div className="rp-post">
                        <span className="rp-r">
                        Review: {post?.owner_review}
                        </span>
                        <span className="rp-w">
                        Watching On: {post?.watching_on}
                        </span>
                        <span className="rp-c">
                        Category: {post?.category}
                        </span>
                        <span className="rp-rating">
                        Rating: {post?.owner_rating}
                        </span>
                        </div>

            </div>
            <div className="rp-b"></div>
            <div className="other-reviews">
                <div className="reviews-container">
                <div className="create-review-btn">
                <h2>
                    Reviews
                </h2>
                {!userReviews.length &&
                 <OpenModalButton
                 buttonText='Create Review'
                 modalComponent={<CreateReviewModal postId={postId}/>}
                 />

                }
                </div>
                <span className="r-count">{postsReviews.length} {postsReviews.length === 1 ? 'Review' : 'Reviews'}</span>
                {postsReviews.length ?

                <span className="avg-rating">Average Rating • {parseFloat(avgRating).toFixed(1)}</span> :
                <span className="avg-rating">Average Rating • No reviews yet!</span>
                }
                {postsReviews.toReversed().map(review => {
                    const isCurrentUser = review.user.id === user.id
                    return (
                        <div className="rp-review" key={review.id}>
                            <div className="rv-manage-buttons">
                                {isCurrentUser && (
                                    <EditDeleteReviewDrop user={user} reviewId={review.id} postId={postId}
                                    />
                                )}
                            </div>
                            <span className="rv-username">{review.user.username}</span>
                            <span className="rp-r">{review.review_body}</span>
                            <span className="rp-rating">Rating: {parseFloat(review.rating).toFixed(1)}</span>

                        </div>
                    )
                })}
                </div>
                {/* <div className="create-review-btn">
                {!userReviews.length &&
                 <OpenModalButton
                                buttonText='Create Review'
                                modalComponent={<CreateReviewModal postId={postId}/>}
                            />

                }
                </div> */}

            </div>

        </div>
    )
}

export default ReviewPage
