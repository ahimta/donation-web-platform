import * as database from '../database';
import UserRole from '../types/UserRole';

export function fetchAllDonations() {
  const foodPromise = database.getDonations('food');
  const nonfoodPromise = database.getDonations('nonfood');
  const donationsPromise = Promise.all([foodPromise, nonfoodPromise]).then(([foodDonations, nonfoodDonations]) => {
    return {foodDonations, nonfoodDonations};
  });

  return {type: 'FETCH_ALL_DONATIONS', payload: donationsPromise};
}

export function fetchActivity(role?: UserRole, userId?: string) {
  const activityPromise = database.getActivity().then((activity) => {
    if (role && userId) {
      return activity.filter(({userId: id, userRole}) => userRole === role && id === userId);
    } else {
      return activity;
    }
  });

  return {type: 'FETCH_ACTIVITY', payload: activityPromise};
}
