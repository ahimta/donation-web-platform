import DonationType from './DonationType';
import IDatetime from './DonationType';
import IDonation from './IDonation';
import IUser from './IUser';
import UserRole from './UserRole';

interface IActivity {
  '.key'?: string;
  actionName: ('cancel-reservation' | 'delivery' | 'donation' | 'reservation');
  datetime: IDatetime;
  donation?: IDonation;
  donationId: string;
  donationType: DonationType;
  user?: IUser;
  userId: string;
  userRole: UserRole;
}

export default IActivity;
