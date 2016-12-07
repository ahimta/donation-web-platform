/// <reference path="../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {IStore} from '~react-redux~redux';
import {applyRouterMiddleware, IndexRoute, Redirect, Router, Route, hashHistory} from 'react-router';
import {useScroll} from 'react-router-scroll';

import App from './app/containers/App';
import CharityRegister from './app/pages/CharityRegister';
import configureStore from './app/store/configureStore';
import Donations from './app/pages/Donations';
import FoodDonation from './app/pages/FoodDonation';
import Homepage from './app/pages/Homepage';
import NewFoodDonation from './app/pages/NewFoodDonation';
import NewOtherDonation from './app/pages/NewOtherDonation';
import NonfoodDonation from './app/pages/NonfoodDonation';
import Profiles from './app/pages/Profiles';
import User from './app/pages/User';

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
    <Router history={hashHistory}
      render={applyRouterMiddleware(useScroll((_0, _1) => ([0, 0])))}>
      <Route path='/' component={App}>
        <IndexRoute component={Homepage} />
      </Route>

      <Route path='/charities' component={App}>
        <Route path='register' component={CharityRegister} />
      </Route>

      <Route path='/donations' component={App}>
        <IndexRoute component={Donations} />

        <Route path='donate/food' component={NewFoodDonation} />
        <Route path='donate/other' component={NewOtherDonation} />

        <Route path='food/:id' component={FoodDonation} />
        <Route path='other/:id' component={NonfoodDonation} />

        <Route path='receive' component={Donations} />
        <Route path='deliver' component={Donations} />
      </Route>

      <Route path='/profiles' component={App}>
        <IndexRoute component={Profiles} />
      </Route>

      <Route path='/users' component={App}>
        <Route path=':id' component={User} />
      </Route>

      <Redirect from='*' to='/' />
    </Router>
  </Provider>,
  document.getElementById('root')
);
