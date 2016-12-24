import IFoodDonation from '../types/IFoodDonation';
import INonfoodDonation from '../types/INonfoodDonation';

interface IAction {
  readonly type: string;
  readonly payload: any;
}

interface IState {
  readonly errorCode?: number;
  readonly foodDonations?: ReadonlyArray<IFoodDonation>;
  readonly nonfoodDonations?: ReadonlyArray<INonfoodDonation>;
}

const initialState = {
  errorCode: null,
  foodDonations: null,
  nonfoodDonations: null
};

export default function donations(state: IState = initialState, {payload, type}: IAction) {
  switch (type) {
    case 'FETCH_ALL_DONATIONS_PENDING':
      return initialState;

    case 'FETCH_ALL_DONATIONS_FULFILLED':
    case 'REMOVE_DONATION_FULFILLED':
      const {foodDonations, nonfoodDonations} = payload;
      return {errorCode: null, foodDonations, nonfoodDonations};

    case 'FETCH_ALL_DONATIONS_REJECTED':
      return {errorCode: payload.code, foodDonations: null, nonfoodDonations: null};

    default:
      return state;
  }
}
