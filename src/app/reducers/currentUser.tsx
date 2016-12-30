interface IAction {
  readonly type: 'SET_CURRENT_USER';
  readonly payload: any;
}

interface IState {
  readonly charityId: string;
  readonly id: string;
  readonly role: string;
  readonly userId: string;
}

const initialState = {
  charityId: '',
  id: '',
  role: '',
  userId: ''
};

export default function user(state: IState = initialState, {payload, type}: IAction): IState {
  switch (type) {
    case 'SET_CURRENT_USER':
      return payload;

    default:
      return state;
  }
}
