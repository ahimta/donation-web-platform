import IFirebaseObject from './IFirebaseObject';

interface IReservation {
  readonly deliveredOrReceived: boolean;
  readonly reserverId: string;
  readonly type: string;
}

type Reservation = IFirebaseObject & IReservation;

export default Reservation;
