import IFirebaseObject from './IFirebaseObject';

interface IRegularUser {
  readonly displayName: string;
  readonly email: string;
  readonly phone?: string;
  readonly photoURL: string;
  readonly uid: string;
}

type RegularUser = IFirebaseObject & IRegularUser;

export default RegularUser;
