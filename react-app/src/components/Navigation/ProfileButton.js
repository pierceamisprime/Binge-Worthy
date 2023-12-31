import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
    closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="profile-btn" onClick={openMenu}>
        <i className="fas fa-user-circle fa-2xl" style={{color: "#557e71"}} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-menu">
            <button className="logout-btn" onClick={() => {
              history.push(`/users/${user.id}`)
              closeMenu()
            }}>{user.username}</button>
            {/* <li>{user.email}</li> */}
            <button className="logout-btn" onClick={() => {
              history.push('/about')
              closeMenu()
            }}>About</button>
            <li>
              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </li>
            </div>
        ) : (
          <div className="log-sign-dd">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
