import IUser from './IUser';

interface INonfoodDonation {
  readonly '.key'?: string;
  readonly donor?: IUser;
  readonly donorId?: string;
  readonly location: string;
  readonly notes: string;
  readonly phone: string;
  readonly state: string;
  readonly type: string;
  readonly user?: IUser;
}

export default INonfoodDonation;
