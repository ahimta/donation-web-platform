/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IStore} from '~react-redux~redux';
import {Provider} from 'react-redux';
import {IndexRoute, Redirect, Router, Route, hashHistory} from 'react-router';

import App from './app/containers/App.tsx';
import configureStore from './app/store/configureStore.tsx';
import Homepage from './app/pages/Homepage';
import NewFoodDonation from './app/pages/NewFoodDonation';

// import 'todomvc-app-css/index.css!';

const store: IStore<any> = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Homepage} />
        <Route path='/donations/donate/food' component={NewFoodDonation} />
        <Redirect from='/*' to='/' />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
