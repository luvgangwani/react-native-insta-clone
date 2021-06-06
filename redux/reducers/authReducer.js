import { SET_AUTH_USER_STATE } from '../actions/types';
const initialState = {
    user: null,
};

export const auth = (state = initialState, action) => {
    const { type, payload } = action;
    let returnVal = state;
   switch (type) {
       case SET_AUTH_USER_STATE:
           returnVal = {
               ...state,
               user: payload,
           }
           break;
   
       default:
           break;
   }

   return returnVal;
}