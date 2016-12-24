import * as Immutable from 'immutable';

import IDonation from '../types/IDonation';
import IFoodDonation from '../types/IFoodDonation';
import INonfoodDonation from '../types/INonfoodDonation';
import IReservation from '../types/IReservation';

interface IAction {
  readonly type: string;
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
  donation: null as IDonation,
  foodDonations: null,
  nonfoodDonations: null,
  reservation: {} as IReservation
};

export default function donations(state: IState = initialState, {payload, type}: IAction) {
  switch (type) {
    case 'FETCH_ALL_DONATIONS_FULFILLED':
    case 'REMOVE_DONATION_FULFILLED':
    case 'FETCH_DONATION_FULFILLED':
      return Immutable.Map(state).merge(payload).merge({ errorCode: null }).toJS();

    case 'FETCH_ALL_DONATIONS_PENDING':
      return Immutable.Map(state).merge(payload).merge({ foodDonations: null, nonfoodDonations: null }).toJS();

    case 'FETCH_DONATION_PENDING':
      return Immutable.Map(state).merge(payload).merge({ donation: null, errorCode: null }).toJS();

    case 'FETCH_DONATION_REJECTED':
      return Immutable.Map(state).merge({ errorCode: payload.code }).toJS();

    default:
      return state;
  }
}
