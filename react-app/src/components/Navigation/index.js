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
				<NavLink exact to={sessionUser ? '/posts' : '/'}>Home</NavLink>
			</li>
			<li className='nav-function-buttons'>
			<li>
				{sessionUser &&
				<OpenModalButton
				buttonText={<i class="fa-solid fa-square-plus" style={{color: "#4dffd2"}}></i>}
				modalComponent={<CreatePostModal categories={categories} />}
				/>

				}
			</li>

			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
