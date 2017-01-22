/// <reference path="../../../typings/index.d.ts" />

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

const middleware = applyMiddleware(thunk, promiseMiddleware(), logger());
const store = createStore(rootReducer, middleware);

export default function configureStore() {
  return store;
}
