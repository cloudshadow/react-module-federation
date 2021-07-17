import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import { IHomeState } from '@/types/HomeTypes';

export function getThunkRequest(): Promise<AxiosResponse<IHomeState>> {
  return axios.get<IHomeState>(urlHelper.t(urlHelper.servers.localServer, 'users'));
}
export function getEpicRequest(): Promise<AxiosResponse<IHomeState>> {
  // return fetch(`http://0.0.0.0:4000/mock_data/CloudShadow_Api_title.json`).then(response => response);
  return axios.get<IHomeState>(urlHelper.t(urlHelper.servers.prodServer, 'epic'));
}
