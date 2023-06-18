import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import CreatePostModal from './CreatePostModal';
import { getAllCategoriesThunk } from '../../store/categories';

function Navigation({ isLoaded }){
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	const categories = useSelector(state => state.categories)

	useEffect(() => {
		dispatch(getAllCategoriesThunk())
	}, [dispatch])

	return (
		<ul className='nav-bar-container'>
			<li>
				<NavLink exact to={sessionUser ? '/posts' : '/'}>
					<img className='bw-logo' src='https://i.imgur.com/squTCxA.png'></img>
				</NavLink>
			</li>
			<li className='nav-function-buttons'>
			<li className='nav-create-btn'>
				{sessionUser &&
				<OpenModalButton
				buttonText={<i class="fa-solid fa-square-plus fa-2xl" style={{color: "#557e71"}}></i>}
				modalComponent={<CreatePostModal categories={categories} />}
				/>

				}
			</li>

			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			</li>
		</ul>
	);
}

export default Navigation;
