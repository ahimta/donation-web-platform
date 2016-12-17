import IFirebaseObject from './IFirebaseObject';

interface IRegularUser {
  readonly displayName: string;
  readonly email: string;
  readonly phone?: string;
  readonly uid?: string;
}

type T = IFirebaseObject & IRegularUser;

export default T;
