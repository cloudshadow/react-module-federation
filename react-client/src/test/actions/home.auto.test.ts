import { PayloadAction } from 'typesafe-actions';
import { IHomeState } from '@/types/HomeTypes';
import { homeActions } from '@/actions/homeActions';

describe('homeActions', () => {
  describe('fetchTitleEpicAsync', () => {
    it('homeActions.fetchTitleEpicAsync.request', () => {
      const expectedAction: PayloadAction<string, undefined> = {
        type: 'FETCH_USERS_REQUEST',
        payload: undefined,
      };
      expect(homeActions.fetchUsersAsync.request()).toEqual(expectedAction);
    });

    it('homeActions.fetchTitleEpicAsync.success', () => {
      const data = { users: [], loading: false, error: false };
      const expectedAction: PayloadAction<string, IHomeState> = {
        type: 'FETCH_USERS_SUCCESS',
        payload: data,
      };
      expect(homeActions.fetchUsersAsync.success(data)).toEqual(expectedAction);
    });

    it('homeActions.fetchTitleEpicAsync.failure', () => {
      const error: Error = { name: 'errorName', message: 'Something went wrong' };
      const expectedAction: PayloadAction<string, Error> = {
        type: 'FETCH_USERS_FAILURE',
        payload: error,
      };
      expect(homeActions.fetchUsersAsync.failure(error)).toEqual(expectedAction);
    });
  });
});
