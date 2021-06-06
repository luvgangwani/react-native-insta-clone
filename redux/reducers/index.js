import { combineReducers } from 'redux';
import { auth } from './authReducer';
import { posts } from './postReducer';

const Reducers = combineReducers({
    auth,
    posts,
});

export default Reducers;