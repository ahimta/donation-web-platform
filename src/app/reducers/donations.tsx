import IFoodDonation from '../types/IFoodDonation';
import INonfoodDonation from '../types/INonfoodDonation';

interface IAction {
  readonly type: 'FETCH_ALL_DONATIONS' | 'FETCH_ALL_DONATIONS_FULFILLED';
  readonly payload: any;
}

interface IState {
  readonly foodDonations: ReadonlyArray<IFoodDonation>;
  readonly nonfoodDonations: ReadonlyArray<INonfoodDonation>;
}

const initialState = {
  foodDonations: [],
  nonfoodDonations: []
};

export default function donations(state: IState = initialState, {payload: donations, type}: IAction) {
  switch (type) {
    case 'FETCH_ALL_DONATIONS_FULFILLED':
      return donations;

    default:
      return state;
  }
}
