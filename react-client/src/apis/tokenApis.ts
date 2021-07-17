import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import { IRefreshRequest, IRefreshResponse } from '@/types/UtilsTypes';

export function refreshTokenThunk(payload: IRefreshRequest): Promise<AxiosResponse<IRefreshResponse>>{
  return axios.post<IRefreshResponse>(urlHelper.t(urlHelper.servers.localServer, 'refresh'), payload)
}