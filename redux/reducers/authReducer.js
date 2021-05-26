import { FETCH_USER, USER_REGISTER } from '../actions/types';
const initialState = {
    user: null,
};

export const auth = (state = initialState, action) => {
    const { type, payload } = action;
    let returnVal = state;
   switch (type) {
       case FETCH_USER:
           returnVal = {
               ...state,
               user: payload,
           }
           break;
        case USER_REGISTER:
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