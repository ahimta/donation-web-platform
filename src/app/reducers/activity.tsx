import IActivity from '../types/IActivity';

interface IAction {
  readonly type: 'FETCH_ACTIVITY' | 'FETCH_ACTIVITY_FULFILLED' | 'FETCH_ACTIVITY_REJECTED';
  readonly payload: any;
}

interface IState {
  readonly activity: ReadonlyArray<IActivity>;
}

const initialState = {
  activity: []
};

export default function activity(state: IState = initialState, {payload: activity, type}: IAction): IState {
  switch (type) {
    case 'FETCH_ACTIVITY_FULFILLED':
      return {activity};

    default:
      return state;
  }
}
