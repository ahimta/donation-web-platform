import firebase from 'firebase';

import ICharity from './types/ICharity';
import IRegularUser from './types/IRegularUser';

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

export function logout(): Promise<void> {
  return firebase.auth().signOut().then(() => {
    console.log('logout');
  }).catch((error) => {
    console.log(error);
  });
}

export function registerCharity({description, email, location, name, password, phone, website}: ICharity): Promise<any> {

  return firebase.auth().createUserWithEmailAndPassword(email, password).then((loggedInCharity) => {
    const {email, uid} = loggedInCharity;
    return firebase.database().ref('charities').child(uid).set({ description, email, location, name, phone, website });
  }).catch((error) => {
    console.log(error);
  });
}

export function loginAsCharity(email: string, password: string): Promise<any> {
  return firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    console.log(error);
  });
}
