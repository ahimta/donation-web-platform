interface IReservation {
  readonly deliveredOrReceived: boolean;
  readonly reserverId: string;
  readonly type: string;
}

export default IReservation;
