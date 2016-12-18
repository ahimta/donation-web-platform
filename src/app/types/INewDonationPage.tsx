import DonationType from './DonationType';
import IDonation from './IDonation';

interface INewDonationPage {
  readonly donationType: DonationType;
  readonly getDonation: () => IDonation;
}

export default INewDonationPage;
