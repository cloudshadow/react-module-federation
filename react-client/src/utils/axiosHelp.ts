import axios from 'axios';
import { IRefreshResponse, IRefreshToken } from '@/types/UtilsTypes';
import { refreshTokenThunk } from '@/apis/tokenApis';
import { history } from '@/reducers';

export const interceptorRequest = () => {
  axios.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token') || '';
    console.log('react-client', accessToken)
    config.headers.common['Authorization'] = accessToken ? `Bearer ${accessToken}` : null;
    return config;
  });
};

export const interceptorResponse = () => {
  axios.interceptors.response.use((response) =>{
      // Do something with response data
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 || error.response.status === 403 && !originalRequest._retry) {
        const refreshToken: string = localStorage.getItem('refresh_token') || '';
        if(refreshToken){
          const refreshTokenObj: IRefreshToken = JSON.parse(localStorage.getItem('refresh_token') || '{}');
          if (refreshTokenObj.exp > new Date().getTime()) {
            return refreshTokenThunk({refreshToken}).then((response) => {
              const refreshInfo: IRefreshResponse = response.data;
              localStorage.setItem('access_token', refreshInfo.accessToken);
              localStorage.setItem('refresh_token', refreshInfo.refreshToken);
              originalRequest.headers.Authorization = `Bearer ${refreshInfo.accessToken}`;
              originalRequest._retry = true;

              return axios(originalRequest);
            })
            .catch(err => {
                console.log(err)
            });
          } else {
            history.push('/login');
          }
        } else {
          history.push('/login');
        }
      }
      return Promise.reject(error);
    }
  );
};