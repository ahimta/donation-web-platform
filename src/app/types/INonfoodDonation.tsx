import IFirebaseObject from './IFirebaseObject';
import IUser from './IUser';

interface INonfoodDonation {
  readonly donor?: IUser;
  readonly donorId?: string;
  readonly location: string;
  readonly notes: string;
  readonly phone: string;
  readonly photoUrl?: string;
  readonly state: string;
  readonly type: string;
  readonly user?: IUser;
}

type NonfoodDonation = IFirebaseObject & INonfoodDonation;

export default NonfoodDonation;
