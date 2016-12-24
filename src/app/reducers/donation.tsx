import IDonation from '../types/IDonation';
import IReservation from '../types/IReservation';

interface IAction {
  readonly type: string;
  readonly payload: any;
}

interface IState {
  readonly donation?: IDonation;
  readonly errorCode?: number;
  readonly reservation?: IReservation;
}

const initialState = {
  donation: null,
  errorCode: null,
  reservation: {} as IReservation
};

export default function donation(state: IState = initialState, {payload, type}: IAction): IState {
  switch (type) {
    case 'FETCH_DONATION_PENDING':
      return initialState;

    case 'FETCH_DONATION_FULFILLED':
      const {donation, reservation} = payload;
      return {donation, errorCode: null, reservation};

    case 'FETCH_DONATION_REJECTED':
      return {donation: null, errorCode: payload.code, reservation: {} as IReservation};

    default:
      return state;
  }
}
