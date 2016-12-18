import IUser from './IUser';

interface IDonationObject {
  readonly deliveredOrReceived?: boolean;
  readonly donor?: IUser;
  readonly donorId?: string;
  readonly location: string;
  readonly notes: string;
  readonly phone: string;
  readonly photoUrl?: string;
  readonly reserverId?: string;
  readonly reservationType?: string;
  readonly type: string;
  readonly user?: IUser;
}

export default IDonationObject;
