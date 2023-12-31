import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { allPostsThunk } from "../../store/posts"
import CreateReviewModal from "../ReviewPage/CreateReview.Modal"
import OpenModalButton from "../OpenModalButton"
import EditDeleteDrop from "./EditDeleteDropMenu"
import './LandingPage.css'
import { getAllCategoriesThunk } from "../../store/categories"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BookmarkButton from "../BookMarks"
import { getUserThunk } from "../../store/session"


const LandingPage = () => {
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

      if (!posts) return null;


    return (

        <div className="lp-posts-container">
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
                    <Link className="lp-post" to={`/posts/${post.id}/reviews`} key={post.id} >
                         <div className="manage-buttons">
                            {/* <span className="lp-user">{post.user.username}</span> */}
                            <NavLink className='lp-user' to={`/users/${post.user.id}`}>{post.user.username}</NavLink>
                            <div className="edit-dl-drop">
                            {isCurrentUser ? (
                                    <EditDeleteDrop user={user} postId={post.id}
                                    />

                                    ) :  <Link className="like-button" to={`/posts`}>
                                    <BookmarkButton sessionUser={user} post={post} />
                                  </Link>}
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
                    </Link>
                )
            })}
          </Carousel>

          <div className="lp-category">

<h2>Action/Adventure</h2>
            </div>

                        <Carousel className="lp-carousel"
        showDots={true}
        responsive={responsive}

        >
            {actionPosts.toReversed().map(post => {
                const isCurrentUser = post.user.id === user.id;
                return (
                    <Link className="lp-post" to={`/posts/${post.id}/reviews`} key={post.id} >
                         <div className="manage-buttons">
                            {/* <span className="lp-user">{post.user.username}</span> */}
                            <NavLink className='lp-user' to={`/users/${post.user.id}`}>{post.user.username}</NavLink>
                            <div className="edit-dl-drop">
                            {isCurrentUser ? (
                                    <EditDeleteDrop user={user} postId={post.id}
                                    />

                                    ) :  <div className="like-button">
                                    <BookmarkButton sessionUser={user} post={post} />
                                  </div>}
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
                    </Link>
                )
            })}
          </Carousel>
          <div className="lp-category">

<h2>Fantasy</h2>
            </div>

                        <Carousel className="lp-carousel"
        showDots={true}
        responsive={responsive}

        >
            {fantasyPosts.toReversed().map(post => {
                const isCurrentUser = post.user.id === user.id;
                return (
                    <Link className="lp-post" to={`/posts/${post.id}/reviews`} key={post.id} >
                         <div className="manage-buttons">
                         <NavLink className='lp-user' to={`/users/${post.user.id}`}>{post.user.username}</NavLink>
                            <div className="edit-dl-drop">
                            {isCurrentUser ? (
                                    <EditDeleteDrop user={user} postId={post.id}
                                    />

                                    ) :  <div className="like-button">
                                    <BookmarkButton sessionUser={user} post={post} />
                                  </div>}
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
                    </Link>
                )
            })}
          </Carousel>
          <div className="lp-category">

<h2>Science-fiction</h2>
            </div>

                        <Carousel className="lp-carousel"
        showDots={true}
        responsive={responsive}

        >
            {scienceFicttionPosts.toReversed().map(post => {
                const isCurrentUser = post.user.id === user.id;
                return (
                    <Link className="lp-post" to={`/posts/${post.id}/reviews`} key={post.id} >
                         <div className="manage-buttons">
                         <NavLink className='lp-user' to={`/users/${post.user.id}`}>{post.user.username}</NavLink>
                            <div className="edit-dl-drop">
                            {isCurrentUser ? (
                                    <EditDeleteDrop user={user} postId={post.id}
                                    />

                                    ) :  <div className="like-button">
                                    <BookmarkButton sessionUser={user} post={post} />
                                  </div>}
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
                    </Link>
                )
            })}
          </Carousel>
          <div className="lp-category">

<h2>Drama</h2>
            </div>

                        <Carousel className="lp-carousel"
        showDots={true}
        responsive={responsive}

        >
            {dramaPosts.toReversed().map(post => {
                const isCurrentUser = post.user.id === user.id;
                return (
                    <Link className="lp-post" to={`/posts/${post.id}/reviews`} key={post.id} >
                         <div className="manage-buttons">
                         <NavLink className='lp-user' to={`/users/${post.user.id}`}>{post.user.username}</NavLink>
                            <div className="edit-dl-drop">
                            {isCurrentUser ? (
                                    <EditDeleteDrop user={user} postId={post.id}
                                    />

                                    ) :  <div className="like-button">
                                    <BookmarkButton sessionUser={user} post={post} />
                                  </div>}
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
                    </Link>
                )
            })}
          </Carousel>
          <div className="lp-category">

<h2>Comedy</h2>
            </div>

                        <Carousel className="lp-carousel"
        showDots={true}
        responsive={responsive}

        >
            {comedyPosts.toReversed().map(post => {
                const isCurrentUser = post.user.id === user.id;
                return (
                    <Link className="lp-post" to={`/posts/${post.id}/reviews`} key={post.id} >
                         <div className="manage-buttons">
                         <NavLink className='lp-user' to={`/users/${post.user.id}`}>{post.user.username}</NavLink>
                            <div className="edit-dl-drop">
                            {isCurrentUser ? (
                                    <EditDeleteDrop user={user} postId={post.id}
                                    />

                                    ) :  <div className="like-button">
                                    <BookmarkButton sessionUser={user} post={post} />
                                  </div>}
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
                    </Link>
                )
            })}
          </Carousel>
          <div className="lp-category">

<h2>Horror</h2>
            </div>

                        <Carousel className="lp-carousel"
        showDots={true}
        responsive={responsive}

        >
            {horrorPosts.toReversed().map(post => {
                const isCurrentUser = post.user.id === user.id;
                return (
                    <Link className="lp-post" to={`/posts/${post.id}/reviews`} key={post.id} >
                         <div className="manage-buttons">
                         <NavLink className='lp-user' to={`/users/${post.user.id}`}>{post.user.username}</NavLink>
                            <div className="edit-dl-drop">
                            {isCurrentUser ? (
                                    <EditDeleteDrop user={user} postId={post.id}
                                    />

                                    ) :  <div className="like-button">
                                    <BookmarkButton sessionUser={user} post={post} />
                                  </div>}
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
                    </Link>
                )
            })}
          </Carousel>

        </div>
    )

}

export default LandingPage
