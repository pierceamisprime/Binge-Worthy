import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { createPostThunk } from "../../store/posts"


const CreatePostModal = () => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [title, setTitle] = useState('')
    const [ownerReview, setOwnerReview] = useState('')
    const [ownerRating, setOwnerRating] = useState('')
    const [watchingOn, setWatchingOn] = useState('')
    const [postImg, setPostImg] = useState('')
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        const formData = new FormData();
        formData.append('title', title)
        formData.append('owner_review', ownerReview)
        formData.append('owner_rating', ownerRating)
        formData.append('watching_on', watchingOn)
        formData.append('post_img', postImg)

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
        <div>
hello
        </div>
    )
}

export default CreatePostModal
