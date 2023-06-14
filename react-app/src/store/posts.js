const ALL_POSTS = 'posts/ALL_POSTS';
const CREATE_POST = 'posts/CREATE_POST';

const allPosts = (posts) => ({
    type: ALL_POSTS,
    posts
});

const createPost = (post) => ({
    type: CREATE_POST,
    post
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
        default:
        return state;

    }
}
