import * as Immutable from 'immutable';

import IDonation from '../types/IDonation';
import IFoodDonation from '../types/IFoodDonation';
import INonfoodDonation from '../types/INonfoodDonation';
import IReservation from '../types/IReservation';

interface IAction {
  readonly type: 'FETCH_ALL_DONATIONS' | 'FETCH_ALL_DONATIONS_FULFILLED' | 'FETCH_DONATION_FULFILLED' |
  'FETCH_DONATION_REJECTED' | 'REMOVE_DONATION_FULFILLED';
  readonly payload: any;
}

interface IState {
  readonly donation: IDonation;
  readonly foodDonations: ReadonlyArray<IFoodDonation>;
  readonly nonfoodDonations: ReadonlyArray<INonfoodDonation>;
  readonly reservation: IReservation;

  readonly errorCode?: number;
}

const initialState = {
  donation: {donorId: ''} as IDonation,
  foodDonations: [],
  nonfoodDonations: [],
  reservation: {} as IReservation
};

export default function donations(state: IState = initialState, {payload, type}: IAction) {
  switch (type) {
    case 'FETCH_ALL_DONATIONS_FULFILLED':
    case 'REMOVE_DONATION_FULFILLED':
    case 'FETCH_DONATION_FULFILLED':
      return Immutable.Map(state).merge(payload).toJS();

    case 'FETCH_DONATION_REJECTED':
      if (payload.code === 404) {
        return Immutable.Map(state).merge({ errorCode: 404 }).toJS();
      } else {
        return state;
      }

    default:
      return state;
  }
}
