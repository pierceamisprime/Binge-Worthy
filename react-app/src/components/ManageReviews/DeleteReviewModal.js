import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { allReviewsThunk, deleteReviewThunk } from "../../store/reviews";
import '../ManagePosts/DeletePostsModal.css'

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
        <div className="my-post-delete">
             <i onClick={() => closeModal()} class="fa-solid fa-xmark fa-lg" id="dl-x"></i>
            <h3>Are you sure you want to delete your review?</h3>
            <button id="delete-post-yes" onClick={deleteButton}>Yes (delete this review)</button>
            <button id="delete-post-no" onClick={() => closeModal()}>No (don't delete)</button>
        </div>
    );
}

export default DeleteReviewModal;
