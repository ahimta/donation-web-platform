import ICharity from '../types/ICharity';

interface IAction {
  readonly type: ('FETCH_CHARITY' | 'FETCH_CHARITY_FULFILLED' | 'FETCH_CHARITY_PENDING' | 'FETCH_CHARITY_REJECTED');
  readonly payload: any;
}

interface IState {
  readonly charity?: ICharity;
  readonly errorCode?: number;
}

const initialState = {
  charity: null,
  errorCode: null
};

export default function charity(state: IState = initialState, {payload, type}: IAction): IState {
  switch (type) {
    case 'FETCH_CHARITY_PENDING':
      return initialState;

    case 'FETCH_CHARITY_FULFILLED':
      return { charity: payload, errorCode: null };

    case 'FETCH_CHARITY_REJECTED':
      return { charity: null, errorCode: payload.code };

    default:
      return state;
  }
}
