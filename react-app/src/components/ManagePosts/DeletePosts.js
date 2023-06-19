import React from "react";
import { allPostsThunk, deletePostThunk } from "../../store/posts";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeletePostsModal.css'

function DeletePostModal({ postId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const deleteButton = async (e) => {
        e.preventDefault();


        await dispatch(deletePostThunk(postId));
        dispatch(allPostsThunk())
        closeModal();
    }



    return (
        <div className="my-post-delete">
            	 <i onClick={() => closeModal()} class="fa-solid fa-xmark fa-lg" id="dl-x"></i>
            <h3>Are you sure you want to delete your post?</h3>
            <button id="delete-post-yes" onClick={deleteButton}>Yes (delete this post)</button>
            <button id="delete-post-no" onClick={() => closeModal()}>No (don't delete)</button>
        </div>
    );
}

export default DeletePostModal;
