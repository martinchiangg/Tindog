import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger]; // we may modify this array to add more middlewares

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
