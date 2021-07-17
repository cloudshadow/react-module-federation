import { createAction, createAsyncAction } from 'typesafe-actions';
import { ILoginFrom, IAuthState } from '@/types/AuthTypes';

export const authActions = {
  loginEpicAsync: createAsyncAction(
    'AUTH_LOGIN_EPIC_REQUEST',
    'AUTH_LOGIN_EPIC_SUCCESS',
    'AUTH_LOGIN_EPIC_FAILURE'
  )<ILoginFrom, IAuthState, Error>(),
  // loadToken: createAction('AUTH_LOAD_TOKEN')(),
  saveToken: createAction('AUTH_SAVE_TOKEN', (jwt: IAuthState) => jwt)<IAuthState>(),
  // fetchLoginThunk: createAction('FETCH_LOGIN_THUNK_SUCCESS', (jwt: ILoginFrom) => action()jwt)(),
  loginThunkAsync: createAsyncAction(
    'AUTH_LOGIN_THUNK_REQUEST',
    'AUTH_LOGIN_THUNK_SUCCESS',
    'AUTH_LOGIN_THUNK_FAILURE'
  )<ILoginFrom, IAuthState, Error>(),
};
