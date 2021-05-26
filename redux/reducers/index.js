import { combineReducers } from 'redux';
import { auth } from './authReducer';

const Reducers = combineReducers({
    auth,
});

export default Reducers;