interface IRegularUser {
  readonly '.key'?: string;
  readonly displayName: string;
  readonly email: string;
  readonly phone?: string;
  readonly uid?: string;
}

export default IRegularUser;
