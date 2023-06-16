const ALL_REVIEWS = 'reviews/ALL_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const allReviews = (reviews) => ({
    type: ALL_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

export const allReviewsThunk = () => async (dispatch) => {
    const response = await fetch('/api/reviews')

    if (response.ok) {
        const data = await response.json()
        dispatch(allReviews(data))
        return data
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const createReviewThunk = (postId, review) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/reviews`, {
        method: 'POST',
        body: review
    });
    if (response.ok) {
        const { resReview } = await response.json()
        dispatch(createReview(resReview));
        return resReview
    } else {
        const data = await response.json();
        if (data.errors) {
            return data
        }
    }
};

export const editReviewThunk = (reviewId, review) => async (dispatch) => {
    console.log('thunk=====',reviewId)
    const response = await fetch(`/api/reviews/${reviewId}/update`, {
        method: 'PUT',
        body: review
    });
    if (response.ok) {
        const { resReview } = await response.json()
        dispatch(editReview(resReview));
        return resReview
    } else {
        const data = await response.json();
        if (data.errors) {
            return data
        }
    }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/delete`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteReview(reviewId))
    }
}

const initialState = {}

export default function reviewReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ALL_REVIEWS:
            newState = { ...action.reviews }
            return newState
        case CREATE_REVIEW:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState
        case EDIT_REVIEW:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            newState = { ...state }
            delete newState[action.reviewId]
            return newState
        default:
            return state
    }
}
