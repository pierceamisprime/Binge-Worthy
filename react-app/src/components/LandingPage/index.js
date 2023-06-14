import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allPostsThunk } from "../../store/posts"
import './LandingPage.css'


const LandingPage = () => {
    const dispatch = useDispatch()

    const posts = Object.values(useSelector(state => state.posts))


    useEffect(() => {
        dispatch(allPostsThunk())
    }, [dispatch])






    return (

        <div>
            {posts.toReversed().map(post => {
                return (
                    <div key={post.id}>
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
                    </div>
                )
            })}

        </div>
    )

}

export default LandingPage
