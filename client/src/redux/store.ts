import { createStore, combineReducers } from 'redux';
import { userReducer } from './userReducer';

const reducer = combineReducers({ userReducer });
export const store = createStore(reducer);
// window.store = store;