import DonationType from './DonationType';

interface INewDonationPage {
  readonly donationType: DonationType;
  readonly getDonation: () => any;
}

export default INewDonationPage;
