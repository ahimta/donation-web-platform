import ICharity from '../types/ICharity';

interface IAction {
  readonly type: ('FETCH_CHARITIES' | 'FETCH_CHARITIES_FULFILLED' | 'FETCH_CHARITIES_PENDING' | 'FETCH_CHARITIES_REJECTED' |
    'FETCH_CHARITY' | 'FETCH_CHARITY_FULFILLED' | 'FETCH_CHARITY_PENDING' | 'FETCH_CHARITY_REJECTED');
  readonly payload: any;
}

interface IState {
  readonly charities?: ReadonlyArray<ICharity>;
  readonly charity?: ICharity;
  readonly errorCode?: number;
}

const initialState = {
  charities: null,
  charity: null,
  errorCode: null
};

export default function charities(state: IState = initialState, {payload, type}: IAction): IState {
  switch (type) {
    case 'FETCH_CHARITIES_PENDING':
      return { charities: null, charity: state.charity, errorCode: null };

    case 'FETCH_CHARITIES_FULFILLED':
      return { charities: payload, charity: state.charity, errorCode: null };

    case 'FETCH_CHARITIES_REJECTED':
      return { charities: null, charity: state.charity, errorCode: payload.code };

    case 'FETCH_CHARITY_PENDING':
      return { charities: state.charities, charity: null, errorCode: null };

    case 'FETCH_CHARITY_FULFILLED':
      return { charities: state.charities, charity: payload, errorCode: null };

    case 'FETCH_CHARITY_REJECTED':
      return { charities: state.charities, charity: null, errorCode: payload.code };

    default:
      return state;
  }
}
