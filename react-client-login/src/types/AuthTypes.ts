export interface ILoginState {
  loading: boolean;
  error: boolean;
}
export interface ILoginFrom {
  username: string;
  password: string;
}
export interface IUser {
  email: string;
  userName: string;
  role: number;
  phone: string;
  position: string;
  sex: string;
  updateTime?: string;
  createTime?: string;
  __typename: string;
}

export interface IAuthState {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
export interface IRefreshToken {
  exp: number;
}
export interface IRefreshRequest {
  refreshToken: string;
}
export interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
}
