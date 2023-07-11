const ALL_POSTS = 'posts/ALL_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const EDIT_POST = 'posts/EDIT_POST';
const DELETE_POST = 'posts/DELETE_POST'


const allPosts = (posts) => ({
    type: ALL_POSTS,
    posts
});

const createPost = (post) => ({
    type: CREATE_POST,
    post
})

const editPost = (post) => ({
    type: EDIT_POST,
    post
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})



export const allPostsThunk = () => async (dispatch) => {
    const response = await fetch('/api/posts')

    if (response.ok) {
        const data = await response.json();
        dispatch(allPosts(data));
        return data
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const createPostThunk = (post) => async (dispatch) => {
    const response = await fetch ('/api/posts', {
        method: 'POST',
        body: post
    });
    if (response.ok) {
        const { resPost } = await response.json();
        dispatch(createPost(resPost));
        return resPost;
    } else {
        const data = await response.json();
        if (data.errors) {
            return data
        }
    }
}

export const editPostThunk = (postId, post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/update`, {
        method: 'PUT',
        body: post
    })
    if (response.ok) {
        const { resPost } = await response.json()
        dispatch(editPost(resPost))
        return resPost
    } else {
        const data = await response.json();
        if (data.errors) {
            return data
        }
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/delete`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deletePost(postId))
    }
}


const initialState = {}

export default function postsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ALL_POSTS:
            newState = { ...action.posts }
            return newState
        case CREATE_POST:
            newState = { ...state };
            newState[action.post.id] = action.post
            return newState
        case EDIT_POST:
            newState = { ...state }
            newState[action.post.id] = action.post
            return newState
        case DELETE_POST:
            newState = { ...state }
            delete newState[action.postId]
            return newState
        default:
            return state;

    }
}
