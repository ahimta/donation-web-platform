import firebase from 'firebase';
import { Promise } from 'es6-promise';
import { IStore } from '~react-redux~redux';

import { setNetworkStatus } from './actions/index';
import configureStore from './store/configureStore';
import IRegularUser from './types/IRegularUser';

const store: IStore<any> = configureStore();

function updateNetworkStatus<T>(networkAction: Promise<T>): Promise<T> {
  return networkAction.then((value) => {
    store.dispatch(setNetworkStatus('online'));
    return value;
  }).catch((error) => {
    if (error.code === 'auth/network-request-failed' && window.navigator.onLine) {
      store.dispatch(setNetworkStatus('flaky'));
    }
    return Promise.reject(error);
  });
}

export function ensureLoggedIn(userId?: string): Promise<string> {
  if (userId) {
    return Promise.resolve(userId);
  } else {
    return login().then((user) => {
      return user.uid;
    });
  }
}

export function login(): Promise<IRegularUser> {
  const provider = new firebase.auth.GoogleAuthProvider();

  const loginPromise = firebase.auth().signInWithPopup(provider).then((result) => {
    const user: IRegularUser = result.user;
    console.log(result);
    return user;
  });

  return updateNetworkStatus(loginPromise);
}

export function loginAsCharity(email: string, password: string): Promise<any> {
  return updateNetworkStatus(firebase.auth().signInWithEmailAndPassword(email, password));
}

export function logout(): Promise<{}> {
  return updateNetworkStatus(firebase.auth().signOut());
}

export function onAuthStateChanged(cb: Function) {
  return firebase.auth().onAuthStateChanged(cb);
}
