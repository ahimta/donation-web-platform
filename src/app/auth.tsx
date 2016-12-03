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