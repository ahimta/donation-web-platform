import ICharity from '../types/ICharity';

interface IAction {
  readonly type: ('FETCH_CHARITIES' | 'FETCH_CHARITIES_FULFILLED' | 'FETCH_CHARITIES_PENDING' | 'FETCH_CHARITIES_REJECTED');
  readonly payload: any;
}

interface IState {
  readonly charities?: ReadonlyArray<ICharity>;
  readonly errorCode?: number;
}

const initialState = {
  charities: null,
  errorCode: null
};

export default function charities(state: IState = initialState, {payload, type}: IAction): IState {
  switch (type) {
    case 'FETCH_CHARITIES_PENDING':
      return initialState;

    case 'FETCH_CHARITIES_FULFILLED':
      return { charities: payload, errorCode: null };

    case 'FETCH_CHARITIES_REJECTED':
      return { charities: null, errorCode: payload.code };

    default:
      return state;
  }
}
