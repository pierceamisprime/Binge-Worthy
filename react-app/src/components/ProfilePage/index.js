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
    const userDetails = useSelector(state => state.session.user_details)
    const current_user = useSelector(state => state.session.user)
    // const user = useSelector(state => state.session.userProfile)


    const posts = Object.values(useSelector(state => state.posts))
    // const userPosts = posts.filter(post => post.user?.id === user?.id)

    const [postsChanged, setPostsChanged] = useState(false)
    const [user, setUser] = useState({})

    const userPosts = []

    for (const post of posts) {
        if (post.user.id === parseInt(userId)) {
            userPosts.push(post)
        }
    }


    useEffect(() => {
        dispatch(allPostsThunk());
        const timeout = setTimeout(() => {
            async function data() {
                const ress = await dispatch(getUserThunk(userId));
                if (!ress) {

                    return <h1 style={{ color: "white" }}>LOADING....</h1>
                }

            }
            data()
        }, 500)
        return (() => {
            clearTimeout(timeout)
        })

    }, [dispatch, userId])



    useEffect(() => {
        dispatch(getUserThunk(current_user?.id));
        setPostsChanged(false);
    }, [dispatch, current_user?.id, postsChanged])


    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/users');
            const data = await res.json();

            const user_fetch = data[userId]

            setUser(user_fetch)


        }

        fetchData();

    }, [dispatch, userId])



    const handleFollow = async (e) => {
        const res = await fetch(`/api/users/${userId}/friends`, {
            method: "POST"
        });
        await res.json();
        setPostsChanged(true)
    }


    const handleUnfollow = async (e) => {
        const res = await fetch(`/api/users/${userId}/friends`, {
            method: "DELETE"
        });
        await res.json();
        setPostsChanged(true)
    }

    if (!userDetails) return null;

    if (!userDetails[userId]) return null;

    if (!userDetails[current_user.id]) return null;

    const visiting_profile_friends = Object.values(userDetails[userId]['is_following']);
    const current_user_friends = Object.values(userDetails[current_user.id]['is_following']);

    const friendId = []
    for (const user of current_user_friends) {
        friendId.push(user.id)
    }





    return (
        <div>
        <div className="user-info">
            {current_user.first_name == user.first_name ?
            <OpenModalButton
            buttonText={ <img className="profile-pic" src={user?.profile_pic ? user.profile_pic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} />}
            modalComponent={<ProfilePicModal user={current_user} userId={userId}/>}
            />

            : <img className="profile-pic" src={user?.profile_pic ? user.profile_pic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} />
        }

            {/* // <img className="profile-pic" src={user?.profile_pic ? user.profile_pic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} /> */}
            <span className="pp-name">{user?.first_name} {user?.last_name} </span>
            <div className='intro-house-button'>
                            {!friendId.includes(parseInt(userId)) && current_user.id !== parseInt(userId) && (
                                <button onClick={handleFollow}>Follow</button>
                            )}
                            {friendId.includes(parseInt(userId))  && current_user.id !== parseInt(userId) && (
                                <button onClick={handleUnfollow}>Unfollow</button>
                            )}
                        </div>

            </div>

                <div className="pp-posts-container">
                    <h1>Binge Recommendations</h1>

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
