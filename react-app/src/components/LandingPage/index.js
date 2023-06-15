import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { allPostsThunk } from "../../store/posts"
import EditDeleteDrop from "./EditDeleteDropMenu"
import './LandingPage.css'


const LandingPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const posts = Object.values(useSelector(state => state.posts))



    useEffect(() => {
        dispatch(allPostsThunk())
    }, [dispatch])

    if (!user) return <Redirect to="/" />;





    return (

        <div>
            {posts.toReversed().map(post => {
                const isCurrentUser = post.user.id === user.id;
                return (
                    <div key={post.id}>
                        <div className="manage-buttons">
                            {isCurrentUser && (
                                <EditDeleteDrop user={user} postId={post.id}
                                />
                            )}

                        </div>
                        <img className="lp-images" src={post.post_img}></img>
                       <span>
                        Title: {post.title}
                        </span>
                        <span>
                        Review: {post.owner_review}
                        </span>
                        <span>
                        Rating: {post.owner_rating}
                        </span>
                        <span>
                        Watching On: {post.watching_on}
                        </span>
                        <span>
                        Category: {post.category}
                        </span>
                    </div>
                )
            })}

        </div>
    )

}

export default LandingPage
