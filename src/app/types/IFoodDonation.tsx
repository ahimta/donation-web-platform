import IDatetime from './IDatetime';
import IUser from './IUser';

interface IFoodDonation {
  readonly '.key'?: string;
  readonly dishes: string;
  readonly donor?: IUser;
  readonly donorId?: string;
  readonly location: string;
  readonly notes: string;
  readonly occasion: string;
  readonly phone: string;
  readonly pickupDatetime: IDatetime;
  readonly type: string;
  readonly user?: IUser;
}

export default IFoodDonation;
