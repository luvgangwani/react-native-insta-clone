import { combineReducers } from 'redux';
import { auth } from './authReducer';
import { posts } from './postReducer';
import { following } from './followingReducer';

const Reducers = combineReducers({
    auth,
    posts,
    following,
});

export default Reducers;