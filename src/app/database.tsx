import firebase from 'firebase';

export function removeFoodDonation(id: string) {
  return firebase.database().ref('foodDonations').child(id).remove().then(function() {
    console.log('Remove succeeded.');
  }).catch(function(error) {
    console.log('Remove failed: ' + error.message);
  });
}

export function removeNonfoodDonation(id: string) {
  return firebase.database().ref('otherDonations').child(id).remove().then(function() {
    console.log('Remove succeeded.');
  }).catch(function(error) {
    console.log('Remove failed: ' + error.message);
  });
}