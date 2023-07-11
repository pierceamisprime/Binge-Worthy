import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addBookmarkThunk, deleteBookmarkThunk, } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import './BookMark.css'

const BookmarkButton = ({ sessionUser, post }) => {
  const dispatch = useDispatch();
  const ulRef = useRef();

  let [favoriteColor, setfavoriteColor] = useState("");

  if (!sessionUser) favoriteColor = "";

  if (sessionUser?.user_bookmarks) {
    for (let favorite of sessionUser?.user_bookmarks) {
      if (favorite.id === post?.id) favoriteColor = "yellowFavorite";
    }
  }

  const [showMenu, setShowMenu] = useState(false);

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

  const closeMenu = () => setShowMenu(false);

  const handleFavorite = async () => {
    if (favoriteColor === "yellowFavorite") {
     dispatch(deleteBookmarkThunk(post?.id));
      setfavoriteColor("");
    } else if (favoriteColor === "") {
     dispatch(addBookmarkThunk(post?.id));
      setfavoriteColor("yellowFavorite");
    }
  };

  return (
    <div className={`favorite-button ${favoriteColor}`}>
      {!sessionUser ? (
        <OpenModalButton
          buttonText={
            <div className="favorite">
              <i
                className={
                  favoriteColor ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
                }
              />
            </div>
          }
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
      ) : (
        <button
          onClick={handleFavorite}
          className={`favorite-button ${favoriteColor}`}
        >
          <div className="favorite">
            <i
              className={
                favoriteColor
                  ? "fa-solid fa-bookmark"
                  : "fa-regular fa-bookmark"
              }
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default BookmarkButton;
