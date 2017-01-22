import NetworkStatus from '../types/NetworkStatus';

interface IAction {
  readonly type: 'SET_NETWORK_STATUS';
  readonly payload: NetworkStatus;
}

interface IState {
  readonly status: NetworkStatus;
}

const initialState = {
  status: 'online' as NetworkStatus
};

export default function network(state: IState = initialState, {payload: status, type}: IAction): IState {
  switch (type) {
    case 'SET_NETWORK_STATUS':
      return {status};

    default:
      return state;
  }
}
