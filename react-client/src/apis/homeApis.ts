import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import { IHomeState } from '@/types/HomeTypes';

export function fetchUsers(): Promise<AxiosResponse<IHomeState>> {
  return axios.get<IHomeState>(urlHelper.t(urlHelper.servers.localServer, 'users'));
}