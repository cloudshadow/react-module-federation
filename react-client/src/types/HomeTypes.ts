export interface IHomeState {
  users: IUser[];
  loading: boolean;
  error: boolean;
}

export interface IUser{
  email: string;
  userName: string;
  phone: string;
}
