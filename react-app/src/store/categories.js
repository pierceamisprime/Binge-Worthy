const ALL_CATEGORIES = 'categories/ALL_CATEGORIES'

const allCategories = (categories) => {
    return {
        type: ALL_CATEGORIES,
        categories
    }

}

export const getAllCategoriesThunk = () => async (dispatch) => {
    const response = await fetch('/api/categories')

    if (response.ok) {
        const data = await response.json();
        dispatch(allCategories(data))
        return data;
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

const initialState = {};

const categoriesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_CATEGORIES:
            newState = { ...action.categories}
            return newState
        default:
            return state;
    }
}

export default categoriesReducer
