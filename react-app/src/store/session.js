// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ALL_USERS = 'session/ALL_USERS';
const GET_USER = 'session/GET_USER';
const EDIT_USER = 'session/EDIT_USER';

const editUser = (user) => ({
	type: EDIT_USER,
	user
})

const getUser = (userId) => ({
	type: GET_USER,
	userId
})

const allUsers = (users) => ({
	type: ALL_USERS,
	users
})

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});



const initialState = { user: null };


export const editUserThunk = (user, userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/update`, {
        method: 'PUT',
        body: user
    })
    if (response.ok) {
        const { resPost } = await response.json()
        dispatch(editUser(resPost))
        return resPost
    } else {
        const data = await response.json();
        if (data.errors) {
            return data
        }
    }
}

export const getUserThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`)

	if (response.ok) {
		const data = await response.json()
		dispatch(getUser(data))
		return data
	} else {
		const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

	}
}

export const allUsersThunk = () => async (dispatch) => {
	const response = await fetch('/api/users')

	if (response.ok) {
		const data = await response.json()
		dispatch(allUsers(data))
		return data
	} else {
		const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

	}
}

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (first_name, last_name, username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			first_name,
			last_name
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case ALL_USERS:
			newState = { ...state }
			newState.allUsers = {...action.users}
			return newState
		case GET_USER:
			newState = { ...state }
			newState.userProfile = { ...action.userId }
			return newState
		case EDIT_USER:
			newState = { ...state }
			newState.userProfile = action.user
			return newState
		default:
			return state;
	}
}
