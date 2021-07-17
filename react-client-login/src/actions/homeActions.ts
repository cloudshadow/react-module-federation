import { createAsyncAction, createAction } from 'typesafe-actions';
import { IHomeState } from '@/types/HomeTypes';

export const homeActions = {
  fetchEpicAsync: createAsyncAction(
    'FETCH_HOME_EPIC_REQUEST',
    'FETCH_HOME_EPIC_SUCCESS',
    'FETCH_HOME_EPIC_FAILURE'
  )<void, IHomeState, Error>(),
  fetchThunk: createAction('FETCH_HOME_THUNK_SUCCESS')<IHomeState>(),
};
