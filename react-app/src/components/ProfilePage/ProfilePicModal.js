import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../context/Modal"
import { editUserThunk, getUserThunk } from "../../store/session"
import './ProfilePage.css'

const ProfilePicModal = ({ user, userId }) => {

    // const { userId } = useParams()



    const { closeModal } = useModal()
    const dispatch = useDispatch()


    const [profilePic, setProfilepic ] = useState(user?.profile_pic)
    // const [username, setUsername ] = useState(user?.username)
    // const [email, setEmail ] = useState(user?.email)
    // const [password, setPassword ] = useState(user?.password)
    const [submitted, setSubmitted] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        const formData = new FormData()
        formData.append('profile_pic', profilePic)



        await dispatch(editUserThunk(formData, userId)).then(() => getUserThunk(userId))
        closeModal()
    }

    return (
        <div className="pp-modal">
            <form className="pp-form" onSubmit={handleSubmit} encType='multipart/form-data'>
                <h2>Edit Profile picture</h2>
            <label>
                    {/* {errors.postImg && submitted && <p style={{ color: 'red '}}>{errors.postImg}</p>} */}
                    <input
                        placeholder="Add Image"
                        type="file"
                        accept="image/*"
                        // value={postImg}
                        onChange={(e) => setProfilepic(e.target.files[0])}
                    />
                </label>
                <div className="create-post-btn-container">
                    <button className="create-post-btn" type="submit">Update</button>
                </div>

            </form>
        </div>
    )
}

export default ProfilePicModal
