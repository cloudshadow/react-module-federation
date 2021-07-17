import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
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

// export function getTitleObservable(): Promise<AxiosResponse<ILoginState>> {
//   return axios.get<ILoginState>(urlHelper.t(urlHelper.servers.prodServer, 'epictitle'));
// }

// export function getTitleThunk(): Promise<AxiosResponse<ILoginState>> {
//   return axios.get<ILoginState>(urlHelper.t(urlHelper.servers.prodServer, 'title'));
// }
export function loginThunk(payload: ILoginFrom): Promise<AxiosResponse<IAuthState>> {
  return axios.post<IAuthState>(urlHelper.t(urlHelper.servers.localServer, 'login'), payload);
}

export function loginObservable(payload: ILoginFrom): Promise<AxiosResponse<IAuthState>> {
  return axios.post<IAuthState>(urlHelper.t(urlHelper.servers.localServer, 'login'), payload);
}

export function refreshTokenThunk(payload: IRefreshRequest): Promise<AxiosResponse<IRefreshResponse>> {
  return axios.post<IRefreshResponse>(urlHelper.t(urlHelper.servers.localServer, 'refresh'), payload);
}
