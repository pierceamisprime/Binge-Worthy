import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
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
    // const post = posts.filter()

    // console.log('post========', postId)

    useEffect(() => {
        dispatch(allPostsThunk())
        dispatch(allReviewsThunk())
    }, [dispatch])


    return (
        <div className="review-page-container">
            <div className="review-post-recap">
            <h2 className="review-title">
                        {post?.title}
                        </h2>
                        <img className="lp-images" src={post?.post_img}></img>
                        <span>
                        Review: {post?.owner_review}
                        </span>
                        <span>
                        Rating: {post?.owner_rating}
                        </span>
                        <span>
                        Watching On: {post?.watching_on}
                        </span>
                        <span>
                        Category: {post?.category}
                        </span>

            </div>
            <div className="other-reviews">
                <div className="reviews-container">
                <h2>
                    Reviews
                </h2>
                {postsReviews.toReversed().map(review => {
                    const isCurrentUser = review.user.id === user.id
                    return (
                        <div className="rp-review" key={review.id}>
                            <div className="mangage-buttons">
                                {isCurrentUser && (
                                    <EditDeleteReviewDrop user={user} reviewId={review.id} postId={postId}
                                    />
                                )}
                            </div>
                            <span>{review.user.username}</span>
                            <span>{review.review_body}</span>
                            <span>Rating: {review.rating}</span>

                        </div>
                    )
                })}
                </div>
                <div className="create-review-btn">

                 <OpenModalButton
                                buttonText='Create Review'
                                modalComponent={<CreateReviewModal postId={postId}/>}
                            />
                </div>

            </div>

        </div>
    )
}

export default ReviewPage
