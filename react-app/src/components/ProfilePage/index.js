import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { allPostsThunk } from "../../store/posts";
import { allUsersThunk, editUserThunk, getUserThunk } from "../../store/session";
import EditDeleteDrop from "../LandingPage/EditDeleteDropMenu";
import OpenModalButton from "../OpenModalButton";
import './ProfilePage.css'
import ProfilePicModal from "./ProfilePicModal";


const ProfilePage = () => {


    const { userId } = useParams()
    const dispatch = useDispatch()
    const current_user = useSelector(state => state.session.user)
    const user = useSelector(state => state.session.userProfile)


    const posts = Object.values(useSelector(state => state.posts))
    const userPosts = posts.filter(post => post.user?.id === user?.id)
// console.log(userPosts)



    useEffect(() => {
        dispatch(getUserThunk(userId))
        dispatch(allPostsThunk())
    }, [dispatch])





    return (
        <div>
        <div className="user-info">
            <OpenModalButton
            buttonText={ <img className="profile-pic" src={user?.profile_pic ? user.profile_pic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} />}
            modalComponent={<ProfilePicModal user={current_user} userId={userId}/>}
            />
            {/* // <img className="profile-pic" src={user?.profile_pic ? user.profile_pic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} /> */}
            <span>{user?.first_name} {user?.last_name} </span>

            </div>

                <div className="pp-posts-container">

        {userPosts.toReversed().map(post => {
            const isCurrentUser = post.user?.id === current_user?.id;
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
                        {/* <span id="lp-review">
                        Review: {post.owner_review}
                        </span> */}
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




        </div>
        </div>

    )
}


export default ProfilePage
