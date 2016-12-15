import DonationType from './DonationType';
import UserRole from './UserRole';

interface IActivity {
  '.key'?: string;
  actionName: ('cancel-reservation' | 'delivery' | 'donation' | 'reservation');
  datetime: {
    years: number;
    months: number;
    date: number; // zero-indexed day of month
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
  donationId: string;
  donationType: DonationType;
  user?: any;
  userId: string;
  userRole: UserRole;
}

export default IActivity;
