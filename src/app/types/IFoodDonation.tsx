import IDatetime from './IDatetime';
import IFirebaseObject from './IFirebaseObject';
import IUser from './IUser';

interface IFoodDonation {
  readonly dishes: string;
  readonly donor?: IUser;
  readonly donorId?: string;
  readonly location: string;
  readonly notes: string;
  readonly occasion: string;
  readonly phone: string;
  readonly photoUrl?: string;
  readonly pickupDatetime: IDatetime;
  readonly type: string;
  readonly user?: IUser;
}

type T = IFirebaseObject & IFoodDonation;

export default T;
