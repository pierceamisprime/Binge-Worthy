import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { getAllCategoriesThunk } from "../../store/categories"
import { createPostThunk } from "../../store/posts"


const CreatePostModal = () => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const categories = Object.values(useSelector(state => state.categories))

    const [title, setTitle] = useState('')
    const [ownerReview, setOwnerReview] = useState('')
    const [ownerRating, setOwnerRating] = useState('')
    const [watchingOn, setWatchingOn] = useState('')
    const [postImg, setPostImg] = useState('')
    const [category, setCategory] = useState(0)
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState('')



    // dispatch(getAllCategoriesThunk())
    console.log('categories =======' , categories)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        const formData = new FormData();
        formData.append('title', title)
        formData.append('owner_review', ownerReview)
        formData.append('owner_rating', ownerRating)
        formData.append('watching_on', watchingOn)
        formData.append('post_img', postImg)
        formData.append('category', category)
        console.log('formData==============',formData)
        console.log(category)
        console.log(ownerReview)

        const data = await dispatch(createPostThunk(formData))


        if (data.errors) {
            return setErrors(data.errors[0])
        }

        if (submitted && errors) {
            setErrors('')
        }

        return closeModal()
    }


    return (
        <div className="create-post-modal-container">
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    <textarea
                        placeholder="Review"
                        type="text"
                        value={ownerReview}
                        onChange={(e) => setOwnerReview(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        placeholder="Rating"
                        type="text"
                        value={ownerRating}
                        onChange={(e) => setOwnerRating(e.target.value)}
                    />
                </label>
                <label>
                    <select
                        placeholder='Watching On'
                        type="text"
                        value={watchingOn}
                        onChange={(e) => setWatchingOn(e.target.value)}
                    >
                        <option value="other">Other</option>
                        <option value="Disney+">Disney+</option>
                        <option value="Hulu">Hulu</option>
                        <option value="Netflix">Netflix</option>
                        <option value="Amazon">Amazon Prime Video</option>
                        <option value="Max">Max</option>
                        <option value="AppleTv">Apple TV</option>
                        <option value="YoutubeTv">Youtube TV</option>
                        <option value="Paramount+">Paramount+</option>
                    </select>
                </label>
                <label>
                    <select
                        placeholder='Category'
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >{categories.map(category => {
                        return (
                            <option key={category.id}>{category.type}</option>
                        )
                    })}
                    </select>
                </label>
                <label>
                    <input
                        placeholder="Add Image"
                        type="text"
                        value={postImg}
                        onChange={(e) => setPostImg(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit">Post</button>
                </div>

            </form>
        </div>
    )
}

export default CreatePostModal
