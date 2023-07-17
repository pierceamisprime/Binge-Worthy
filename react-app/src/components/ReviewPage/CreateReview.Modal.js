import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { createReviewThunk } from "../../store/reviews"
import './CreateReviewModal.css'


const CreateReviewModal = ({postId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState('')

    useEffect(() => {
        const errors = {}

        if (!review) errors.review = "Please provide Review"
        if (review.length > 500) errors.review = "Review must be between 1-500 characters"
        if (!rating) errors.rating = "Please provide Rating"
        if (!(+rating)) errors.rating = "Rating must be number!"
        if (rating < 1 || rating > 10) errors.rating = "Rating must be between 1-10"
        setErrors(errors)

    }, [review, rating])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        const formData = new FormData()
        formData.append('review_body', review)
        formData.append('rating', rating)

        if (!Object.values(errors).length) {

            await dispatch(createReviewThunk(postId, formData))
            closeModal()
        }
    }

    return (
        <div className="rv-modal">
                <i onClick={() => closeModal()} class="fa-solid fa-xmark fa-lg" id="dl-x"></i>
            <form className="create-review-form" onSubmit={handleSubmit}>
            <h1>Create Review</h1>
                <label>
                {errors.review && submitted && <p style={{ color: 'red '}} className='rv-errors'>{errors.review}</p>}
                    <textarea
                        placeholder="Review..."
                        type='text'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />

                </label>
                <label>
                {errors.rating && submitted && <p style={{ color: 'red '}} className='rv-errors'>{errors.rating}</p>}
                    <input
                        placeholder="Rating"
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </label>
                <div className="create-rv-btn-container">
                    <button className="create-rv-btn" type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateReviewModal
