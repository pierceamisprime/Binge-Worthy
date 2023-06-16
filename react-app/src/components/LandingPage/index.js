import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { allPostsThunk } from "../../store/posts"
import CreateReviewModal from "../ReviewPage/CreateReview.Modal"
import OpenModalButton from "../OpenModalButton"
import EditDeleteDrop from "./EditDeleteDropMenu"
import './LandingPage.css'


const LandingPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const posts = Object.values(useSelector(state => state.posts))



    useEffect(() => {
        dispatch(allPostsThunk())
    }, [dispatch])

    if (!user) return <Redirect to="/" />;





    return (

        <div className="lp-posts-container">
            {posts.toReversed().map(post => {
                const isCurrentUser = post.user.id === user.id;
                return (
                    <div className="lp-posts" key={post.id}>
                        <div className="manage-buttons">
                            {isCurrentUser && (
                                <EditDeleteDrop user={user} postId={post.id}
                                />
                            )}

                        </div>
                        <span>{post.user.username}</span>
                       <h2 className="lp-title">
                        {post.title}
                        </h2>
                        <img className="lp-images" src={post.post_img}></img>
                        <span id="lp-review">
                        Review: {post.owner_review}
                        </span>
                        <span id="lp-rating">
                        Rating: {post.owner_rating}
                        </span>
                        <span id="lp-watching">
                        Watching On: {post.watching_on}
                        </span>
                        <span id="lp-category">
                        Category: {post.category}
                        </span>
                        <div>
                            {/* <button onClick={history.push(`/posts/${post.id}/reviews`)}>Other Reviews</button> */}
                            <NavLink to={`/posts/${post.id}/reviews`}>Other Reviews</NavLink>
                            {/* <OpenModalButton
                                buttonText='Leave Review'
                                modalComponent={CreateReviewModal}
                            /> */}
                        </div>
                    </div>
                )
            })}

        </div>
    )

}

export default LandingPage
