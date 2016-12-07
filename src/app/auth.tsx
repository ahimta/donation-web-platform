import firebase from 'firebase';

export function login() {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider).then((result) => {
    console.log(result);
    return result.user;
  }).catch((error) => {
    console.log(error);
  });
}

export function logout() {
  return firebase.auth().signOut().then(() => {
    console.log('logout');
  }, (error) => {
    console.log(error);
  });
}


export function registerCharity({description, email, name, password, phone, website}: any) {

  return firebase.auth().createUserWithEmailAndPassword(email, password).then((loggedInCharity) => {
    const {email, uid} = loggedInCharity;
    return firebase.database().ref('charities').child(uid).set({description, email, name, phone, website});
  }).catch((error) => {
    console.log(error);
  });
}

export function loginAsCharity(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    console.log(error);
  });
}
