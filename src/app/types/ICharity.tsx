import IFirebaseObject from './IFirebaseObject';

interface ICharity {
  readonly description: string;
  readonly email: string;
  readonly location: string;
  readonly name: string;
  readonly password?: string;
  readonly phone: string;
  readonly photoUrl?: string;
  readonly website: string;
}

type Charity = ICharity & IFirebaseObject;

export default Charity;
