import { SET_USER_POSTS_STATE } from "../actions/types";

const initialState = {
    all: [],
}

export const posts = (state = initialState, action) => {
    const { type, payload } = action;
    let returnState = state;
    switch (type) {
        case SET_USER_POSTS_STATE:
            returnState = {
                ...state,
                all: payload
            };
            break;
    
        default:
            break;
    }

    return returnState;
}