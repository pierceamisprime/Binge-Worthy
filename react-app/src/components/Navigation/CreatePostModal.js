import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { getAllCategoriesThunk } from "../../store/categories"
import { allPostsThunk, createPostThunk } from "../../store/posts"


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

    useEffect(() => {
        const errors = {}

        if (!title) errors.title = "Please provide title"
        if (title.length > 100) errors.title = "Title must be between 1-100 characters"
        if (!ownerReview) errors.ownerReview = "Please provide Review"
        if (ownerReview.length > 500) errors.ownerReview = "Review must be between 1-500 characters"
        if (!ownerRating) errors.ownerRating = "Please provide Rating"
        if (!(+ownerRating)) errors.ownerRating = "Rating must be number!"
        if (ownerRating < 0 || ownerRating > 10) errors.ownerRating = "Rating must be between 0-10"
        if (!watchingOn) errors.watchingOn = "Please provide streaming service"
        if (!postImg) errors.postImg = "Please provide Image"
        if (!category) errors.category = "Please provide category"
        setErrors(errors)
    }, [title, ownerReview, ownerRating, watchingOn, postImg, category])

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

        if (!Object.values(errors).lenth) {
           await dispatch(createPostThunk(formData))
           closeModal()

        }


        // if (data.errors) {
        //     return setErrors(data.errors[0])
        // }

        // if (submitted && errors) {
        //     setErrors('')
        // }

    }


    return (
        <div className="create-post-modal-container">
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    {errors.title && submitted && <p style={{ color: 'red '}}>{errors.title}</p>}
                    <input
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    {errors.ownerReview && submitted && <p style={{ color: 'red '}}>{errors.ownerReview}</p>}
                    <textarea
                        placeholder="Review"
                        type="text"
                        value={ownerReview}
                        onChange={(e) => setOwnerReview(e.target.value)}
                    />
                </label>
                <label>
                    {errors.ownerRating && submitted && <p style={{ color: 'red '}}>{errors.ownerRating}</p>}
                    <input
                        placeholder="Rating"
                        type="text"
                        value={ownerRating}
                        onChange={(e) => setOwnerRating(e.target.value)}
                    />
                </label>
                <label>
                    {errors.watchingOn && submitted && <p style={{ color: 'red '}}>{errors.watchingOn}</p>}
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
                    {errors.category && submitted && <p style={{ color: 'red '}}>{errors.category}</p>}
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
                    {errors.postImg && submitted && <p style={{ color: 'red '}}>{errors.postImg}</p>}
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
