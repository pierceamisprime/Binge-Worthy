import React, { useState, useEffect, useRef } from "react";
import DeleteReviewModal from "../ManageReviews/DeleteReviewModal";
import UpdateReviewModal from "../ManageReviews/UpdateReviewModal";
import OpenModalButton from "../OpenModalButton";

function EditDeleteReviewDrop({ user, reviewId, postId }) {

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const ulClassName = "post-dropdown" + (showMenu ? "" : " hidden");
    // const closeMenu = () => setShowMenu(false);



    return (
        <div className="caret-icon">
            <button onClick={openMenu}>
                <i id="caret-edit-delete" class="fa-solid fa-ellipsis"></i>
            </button>
            <div className={ulClassName} ref={ulRef}>
                {user && (
                    <div className="edit-delete-post">
                        <div className="edit-drop">
                            {console.log("I am in here")}
                            <OpenModalButton
                                buttonText="Edit"
                                modalComponent={<UpdateReviewModal reviewId={reviewId} postId={postId} />}
                            />
                        </div>
                        <div className="delete-drop">
                            <OpenModalButton

                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal reviewId={reviewId} postId={postId} />}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditDeleteReviewDrop;
