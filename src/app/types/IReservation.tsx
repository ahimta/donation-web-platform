import IFirebaseObject from './IFirebaseObject';
import ReservationType from './ReservationType';

interface IReservation {
  readonly deliveredOrReceived: boolean;
  readonly reserverId: string;
  readonly type: ReservationType;
}

type Reservation = IFirebaseObject & IReservation;

export default Reservation;
