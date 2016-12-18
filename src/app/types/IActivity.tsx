import DonationType from './DonationType';
import IDatetime from './IDatetime';
import IDonation from './IDonation';
import IFirebaseObject from './IFirebaseObject';
import IUser from './IUser';
import UserRole from './UserRole';

interface IActivity {
  readonly actionName: ('cancel-reservation' | 'delivery' | 'donation' | 'reservation');
  readonly datetime: IDatetime;
  readonly donation?: IDonation;
  readonly donationId: string;
  readonly donationType: DonationType;
  readonly user?: IUser;
  readonly userId: string;
  readonly userRole: UserRole;
}

type Activity = IActivity & IFirebaseObject;

export default Activity;
