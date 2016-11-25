/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IStore} from '~react-redux~redux';
import {Provider} from 'react-redux';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';

import App from './app/containers/App.tsx';
import configureStore from './app/store/configureStore.tsx';
import Homepage from './app/pages/Homepage';

// import 'todomvc-app-css/index.css!';

const store: IStore<any> = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Homepage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
