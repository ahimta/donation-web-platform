import firebase from 'firebase';
import * as Immutable from 'immutable';

type DonationType = 'food' | 'nonfood';

function getRefName(donationType: DonationType) {
  return (donationType === 'food') ? 'foodDonations' : 'otherDonations';
}

export function removeDonation(donationType: DonationType, donationId: string): Promise<void> {
  return firebase.database().ref(getRefName(donationType)).child(donationId).remove().then(() => {
    console.log('Remove succeeded.');
  }).catch((error) => {
    console.log('Remove failed: ' + error.message);
  });
}

export function removeFoodDonation(id: string) {
  return removeDonation('food', id);
}

export function removeNonfoodDonation(id: string) {
  return removeDonation('nonfood', id);
}

export function getDonation(donationType: DonationType, donationId: string): Promise<({donation: any, donor: any, reservation: any})> {
  const refName = getRefName(donationType);

  return firebase.database().ref(refName).child(donationId).once('value').then((snapshot) => {
    const donation = snapshot.val();
    const reservationPromise = firebase.database().ref('reservations').child(donationId).once('value');
    const userPromise = firebase.database().ref('users').child(donation.donorId).once('value');

    return Promise.all([Promise.resolve(donation), reservationPromise, userPromise]);
  }).then(([donation, reservationSnapshot, userSnapshot]) => {
    return {donation, donor: userSnapshot.val(), reservation: reservationSnapshot.val()};
  });
}

export function cancelReservation(donationId: string): Promise<any> {
  return firebase.database().ref('reservations').child(donationId).update({
    reservationType: null,
    reserverId: null
  });
}

export function reportDonation(donationId: string): Promise<any> {
  return firebase.database().ref('reservations').child(donationId).child('deliveredOrReceived').set(true);
}

export function reserveDonation(donationId: string, reservationType: string, currentUserId: string): Promise<any> {
  return firebase.database().ref('reservations').child(donationId).set({
    deliveredOrReceived: false,
    reservationType,
    reserverId: currentUserId
  });
}

export function createDonation(donationType: DonationType, donation: any) {
    const refName = getRefName(donationType);
    const donationsRef = firebase.database().ref(refName);
    const newDonationKey = donationsRef.push().key;
    const reservation = {
      deliveredOrReceived: false,
      reservationType: null,
      reserverId: null
    };

    return donationsRef.child(newDonationKey).set(donation).then(() => {
      return firebase.database().ref('reservations').child(newDonationKey).set(reservation);
    }).then(() => {
      return newDonationKey;
    });
}

export function getDonations(donationType: DonationType) {
  const refName = getRefName(donationType);

  const donationsRef = firebase.database().ref(refName);
  const reservationsRef = firebase.database().ref('reservations');

  return Promise.all([donationsRef.once('value'), reservationsRef.once('value')])
    .then(([donationsSnapshot, reservationsSnapshot]) => {
      const donations = [];
      const reservations = reservationsSnapshot.val();

      donationsSnapshot.forEach((donationSnapshot) => {
        const donation = donationSnapshot.val();
        const key = donationSnapshot.key;
        const reservation = reservations[key];

        const fullDonation = Immutable.Map(donation).merge(reservation).merge({['.key']: key}).toObject();
        donations.push(fullDonation);
      });

      return donations;
    });
}
