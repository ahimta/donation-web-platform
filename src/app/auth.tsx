import firebase from 'firebase';

import ICharity from './types/ICharity';
import IRegularUser from './types/IRegularUser';

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

  return firebase.auth().signInWithPopup(provider).then((result) => {
    const user: IRegularUser = result.user;
    console.log(result);
    return user;
  }).catch((error) => {
    console.log(error);
  });
}

export function loginAsCharity(email: string, password: string): Promise<any> {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logout(): Promise<void> {
  return firebase.auth().signOut().then(() => {
    console.log('logout');
  }).catch((error) => {
    console.log(error);
  });
}

export function onAuthStateChanged(cb: Function) {
  return firebase.auth().onAuthStateChanged(cb);
}

export function registerCharity({description, email, location, name, password, phone, photoUrl, website}: ICharity): Promise<any> {

  return firebase.auth().createUserWithEmailAndPassword(email, password).then((loggedInCharity) => {
    const {email, uid} = loggedInCharity;
    const charity: ICharity = { description, email, location, name, phone, photoUrl, website };
    return firebase.database().ref('charities').child(uid).set(charity);
  });
}
