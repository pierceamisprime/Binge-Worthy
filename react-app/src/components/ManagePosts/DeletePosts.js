import React from "react";
import { allPostsThunk, deletePostThunk } from "../../store/posts";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


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
        <div className="my-product-delete">
            <h1 style={{ color: "#d4bebe" }}>Are you sure you want to delete your post?</h1>
            <button id="delete-post-yes" onClick={deleteButton} style={{ color: "#d4bebe" }}>Yes (delete this post)</button>
            <button id="delete-post-no" onClick={() => closeModal()} style={{ color: "#d4bebe" }}>No (don't delete)</button>
        </div>
    );
}

export default DeletePostModal;
