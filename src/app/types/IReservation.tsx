import IFirebaseObject from './IFirebaseObject';

interface IReservation {
  readonly deliveredOrReceived: boolean;
  readonly reserverId: string;
  readonly type: string;
}

type T = IFirebaseObject & IReservation;

export default T;
