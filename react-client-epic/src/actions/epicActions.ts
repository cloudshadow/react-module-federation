import { createAsyncAction, createAction } from 'typesafe-actions';
import { IEpicState } from '@/types/EpicTypes';

export const epicActions = {
  fetchEpicAsync: createAsyncAction(
    'FETCH_EPIC_EPIC_REQUEST',
    'FETCH_EPIC_EPIC_SUCCESS',
    'FETCH_EPIC_EPIC_FAILURE'
  )<void, IEpicState, Error>(),
  fetchThunk: createAction('FETCH_EPIC_THUNK_SUCCESS')<IEpicState>(),
};
