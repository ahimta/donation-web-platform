import * as database from '../database';

export function fetchAllDonations() {
  const foodPromise = database.getDonations('food');
  const nonfoodPromise = database.getDonations('nonfood');
  const donationsPromise = Promise.all([foodPromise, nonfoodPromise]).then(([foodDonations, nonfoodDonations]) => {
    return {foodDonations, nonfoodDonations};
  });

  return {type: 'FETCH_ALL_DONATIONS', payload: donationsPromise};
}
