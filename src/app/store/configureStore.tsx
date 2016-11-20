/// <reference path="../../../typings/index.d.ts" />

import {createStore} from 'redux';
import rootReducer from '../reducers/index.tsx';

export default function configureStore(initialState: any) {
  const store = createStore(rootReducer, initialState);
  return store;
}
