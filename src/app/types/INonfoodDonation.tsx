import IDonationObject from './IDonationObject';
import IFirebaseObject from './IFirebaseObject';

interface INonfoodDonation {
  readonly state: string;
}

type NonfoodDonation = IDonationObject & IFirebaseObject & INonfoodDonation;

export default NonfoodDonation;
