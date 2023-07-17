import React, { useState, useEffect, useRef } from "react";
import DeletePostModal from "../ManagePosts/DeletePosts";
import UpdatePostModal from "../ManagePosts/UpdatePostModal";
import OpenModalButton from "../OpenModalButton";

function EditDeleteDrop({ user, postId }) {

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

                            <OpenModalButton
                                buttonText="Edit"
                                modalComponent={<UpdatePostModal postId={postId} />}
                            />
                        </div>
                        <div className="delete-drop">
                            <OpenModalButton

                                buttonText="Delete"
                                modalComponent={<DeletePostModal postId={postId} />}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditDeleteDrop;
