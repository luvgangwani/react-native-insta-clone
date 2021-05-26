import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

// create redux store
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;