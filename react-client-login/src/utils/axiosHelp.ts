import axios from 'axios';
import JWT from 'jwt-decode';
import { IRefreshResponse } from '@/types/AuthTypes';
import { refreshTokenThunk } from '@/apis/authApis';
import { history } from '@/reducers';
import { IJwt } from '@/types/UtilsTypes';

export const interceptorRequest = () => {
  axios.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token') || '';
    config.headers.common['Authorization'] = accessToken ? `Bearer ${accessToken}` : null;
    return config;
  });
};

export const interceptorResponse = () => {
  axios.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 ||
        (error.response.status === 403 && !originalRequest._retry)
      ) {
        const refreshTokenString: string = localStorage.getItem('refresh_token') || '';
        const refreshToken: IJwt = JWT(refreshTokenString);
        console.log('refreshToken:', refreshToken);
        if (Number.parseInt(refreshToken.exp, 10) * 1000 > new Date().getTime()) {
          return refreshTokenThunk({ refreshToken: refreshTokenString })
            .then((response) => {
              const refreshInfo: IRefreshResponse = response.data;
              localStorage.setItem('access_token', refreshInfo.accessToken);
              localStorage.setItem('refresh_token', refreshInfo.refreshToken);
              originalRequest.headers.Authorization = `Bearer ${refreshInfo.accessToken}`;
              originalRequest._retry = true;
              return axios(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          history.push('/login');
        }
      }
      return Promise.reject(error);
    }
  );
};
