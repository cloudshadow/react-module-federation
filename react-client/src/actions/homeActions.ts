import { IHomeState } from '@/types/HomeTypes';
import { createAsyncAction } from 'typesafe-actions';

export const homeActions = {
  fetchUsersAsync: createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE'
  )<void, IHomeState, Error>(),
};
