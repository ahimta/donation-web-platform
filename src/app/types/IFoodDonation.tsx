import IDatetime from './IDatetime';
import IDonationObject from './IDonationObject';
import IFirebaseObject from './IFirebaseObject';

interface IFoodDonation {
  readonly dishes: string;
  readonly occasion: string;
  readonly pickupDatetime: IDatetime;
}

type FoodDonation = IDonationObject & IFirebaseObject & IFoodDonation;

export default FoodDonation;
