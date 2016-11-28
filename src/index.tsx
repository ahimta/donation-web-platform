/// <reference path="../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IStore} from '~react-redux~redux';
import {Provider} from 'react-redux';
import {IndexRoute, Redirect, Router, Route, hashHistory} from 'react-router';

import App from './app/containers/App.tsx';
import configureStore from './app/store/configureStore.tsx';
import Homepage from './app/pages/Homepage';
import NewFoodDonation from './app/pages/NewFoodDonation';
import Donations from './app/pages/Donations';
import Donation from './app/pages/Donation';

firebase.initializeApp({
  apiKey: 'AIzaSyCBf9V-x1HK0dtwoY1HE8ebjyDblgeixD0',
  authDomain: 'donation-web-pla-1479993243743.firebaseapp.com',
  databaseURL: 'https://donation-web-pla-1479993243743.firebaseio.com',
  storageBucket: 'donation-web-pla-1479993243743.appspot.com',
  messagingSenderId: '349166973233'
});

// import 'todomvc-app-css/index.css!';

const store: IStore<any> = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Homepage} />
        <Route path='/donations/donate/food' component={NewFoodDonation} />
        <Route path='/donations' component={Donations} />
        <Route path='/donations/receive' component={Donations} />
        <Route path='/donations/volunteer' component={Donations} />
        <Route path='/donations/:id' component={Donation} />
        <Redirect from='/*' to='/' />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
