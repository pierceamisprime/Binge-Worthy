import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import CreatePostModal from './CreatePostModal';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			<li>
				<OpenModalButton
				buttonText={<i class="fa-solid fa-square-plus" style={{color: "#4dffd2"}}></i>}
				modalComponent={<CreatePostModal />}
				/>
			</li>
		</ul>
	);
}

export default Navigation;
