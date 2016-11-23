/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IStore} from '~react-redux~redux';
import {Provider} from 'react-redux';
import App from './app/containers/App.tsx';
import configureStore from './app/store/configureStore.tsx';
import {Router, Route, browserHistory} from 'react-router';

// import 'todomvc-app-css/index.css!';

const store: IStore<any> = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
