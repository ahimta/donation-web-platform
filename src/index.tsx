/// <reference path="../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {IStore} from '~react-redux~redux';
import {IndexRoute, Redirect, Router, Route, hashHistory} from 'react-router';

import App from './app/containers/App';
import configureStore from './app/store/configureStore';
import Donations from './app/pages/Donations';
import FoodDonation from './app/pages/FoodDonation';
import Homepage from './app/pages/Homepage';
import NewFoodDonation from './app/pages/NewFoodDonation';

firebase.initializeApp({
  apiKey: 'AIzaSyCBf9V-x1HK0dtwoY1HE8ebjyDblgeixD0',
  authDomain: 'donation-web-pla-1479993243743.firebaseapp.com',
  databaseURL: 'https://donation-web-pla-1479993243743.firebaseio.com',
  storageBucket: 'donation-web-pla-1479993243743.appspot.com',
  messagingSenderId: '349166973233'
});

const store: IStore<any> = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Homepage} />
      </Route>

      <Route path='/donations' component={App}>
        <IndexRoute component={Donations} />

        <Route path='donate/food' component={NewFoodDonation} />
        <Route path='receive' component={Donations} />
        <Route path='volunteer' component={Donations} />
        <Route path=':id' component={FoodDonation} />
      </Route>

      <Redirect from='*' to='/' />
    </Router>
  </Provider>,
  document.getElementById('root')
);
