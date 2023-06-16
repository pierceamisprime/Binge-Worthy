import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { allReviewsThunk, deleteReviewThunk } from "../../store/reviews";


function DeleteReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // console.log(reviewId)


    const deleteButton = async (e) => {
        e.preventDefault();


        await dispatch(deleteReviewThunk(reviewId))
        dispatch(allReviewsThunk())
        // dispatch(allPostsThunk())
        closeModal();
    }



    return (
        <div className="my-product-delete">
            <h1 style={{ color: "#d4bebe" }}>Are you sure you want to delete your review?</h1>
            <button id="delete-post-yes" onClick={deleteButton} style={{ color: "#d4bebe" }}>Yes (delete this review)</button>
            <button id="delete-post-no" onClick={() => closeModal()} style={{ color: "#d4bebe" }}>No (don't delete)</button>
        </div>
    );
}

export default DeleteReviewModal;
