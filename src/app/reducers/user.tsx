import IRegularUser from '../types/IRegularUser';

interface IAction {
  readonly type: ('FETCH_USER' | 'FETCH_USER_FULFILLED' | 'FETCH_USER_PENDING' | 'FETCH_USER_REJECTED');
  readonly payload: any;
}

interface IState {
  readonly user?: IRegularUser;
  readonly errorCode?: number;
}

const initialState = {
  user: null,
  errorCode: null
};

export default function user(state: IState = initialState, {payload, type}: IAction): IState {
  switch (type) {
    case 'FETCH_USER_PENDING':
      return initialState;

    case 'FETCH_USER_FULFILLED':
      return { user: payload, errorCode: null };

    case 'FETCH_USER_REJECTED':
      return { user: null, errorCode: payload.code };

    default:
      return state;
  }
}
