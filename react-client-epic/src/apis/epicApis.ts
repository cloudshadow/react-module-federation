import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import { IEpicState } from '@/types/EpicTypes';

export function getThunkRequest(): Promise<AxiosResponse<IEpicState>> {
  return axios.get<IEpicState>(urlHelper.t(urlHelper.servers.prodServer, 'thunk'));
}
export function getEpicRequest(): Promise<AxiosResponse<IEpicState>> {
  // return fetch(`http://0.0.0.0:4000/mock_data/CloudShadow_Api_title.json`).then(response => response);
  return axios.get<IEpicState>(urlHelper.t(urlHelper.servers.prodServer, 'epic'));
}
