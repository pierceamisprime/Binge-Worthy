import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

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
			{/* <i class="fa-solid fa-square-plus" style={{color: "#4dffd2",}}></i> */}
			<i class="fa-solid fa-square-plus" style={{color: "#4dffd2",}}></i>
			</li>
		</ul>
	);
}

export default Navigation;
