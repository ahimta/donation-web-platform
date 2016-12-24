import IActivity from '../types/IActivity';

interface IAction {
  readonly type: 'FETCH_ACTIVITY' | 'FETCH_ACTIVITY_FULFILLED' | 'FETCH_ACTIVITY_PENDING' | 'FETCH_ACTIVITY_REJECTED';
  readonly payload: any;
}

interface IState {
  readonly activity: ReadonlyArray<IActivity>;
}

const initialState = {
  activity: null
};

export default function activity(state: IState = initialState, {payload: activity, type}: IAction): IState {
  switch (type) {
    case 'FETCH_ACTIVITY_FULFILLED':
      return {activity};

    case 'FETCH_ACTIVITY_PENDING':
    case 'FETCH_ACTIVITY_REJECTED':
      return initialState;

    default:
      return state;
  }
}
