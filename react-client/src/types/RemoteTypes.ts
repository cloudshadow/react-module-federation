export interface IUser {
  email: string;
  userName: string;
  phone: string;
}
export interface IRemoteTableState {
  users: IUser[];
} 