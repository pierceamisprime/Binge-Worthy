const ALL_POSTS = 'posts/ALL_POSTS';

const allPosts = (posts) => ({
    type: ALL_POSTS,
    posts
});

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
