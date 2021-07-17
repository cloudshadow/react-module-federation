import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import {
  IAuthState,
  ILoginFrom,
  IRefreshRequest,
  IRefreshResponse,
} from '@/types/AuthTypes';

// export function getTitleObservable(): Promise<AxiosResponse<ILoginState>> {
//   return axios.get<ILoginState>(urlHelper.t(urlHelper.servers.prodServer, 'epictitle'));
// }

// export function getTitleThunk(): Promise<AxiosResponse<ILoginState>> {
//   return axios.get<ILoginState>(urlHelper.t(urlHelper.servers.prodServer, 'title'));
// }
export function loginThunk(payload: ILoginFrom): Promise<AxiosResponse<IAuthState>> {
  return axios.post<IAuthState>(
    urlHelper.t(urlHelper.servers.localServer, 'login'),
    payload
  );
}

export function loginObservable(payload: ILoginFrom): Promise<AxiosResponse<IAuthState>> {
  return axios.post<IAuthState>(
    urlHelper.t(urlHelper.servers.localServer, 'login'),
    payload
  );
}

export function refreshTokenThunk(
  payload: IRefreshRequest
): Promise<AxiosResponse<IRefreshResponse>> {
  return axios.post<IRefreshResponse>(
    urlHelper.t(urlHelper.servers.localServer, 'refresh'),
    payload
  );
}
