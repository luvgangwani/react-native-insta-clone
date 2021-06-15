import { SET_USER_FOLLOWING_STATE } from "../actions/types";

const initialState = {
    following: [],
}
export const following = (state = initialState, action) => {
    let returnVal = state;
    const { type, payload } = action;
    switch (type) {
        case SET_USER_FOLLOWING_STATE:
            returnVal = {
                ...state,
                all: payload,
            };
            break;
        default:
            break;
    };

    return returnVal;
};