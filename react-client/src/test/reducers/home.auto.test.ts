import { produce } from 'immer';
import { ActionType } from 'typesafe-actions';
import rootAction from '@/actions';
import { IHomeState } from '@/types/HomeTypes';
import homeReducer, { defaultHomeState } from '@/reducers/homeReducer';

export type HomeActionsType = ActionType<typeof rootAction.homeActions>;
describe('home reducer', () => {
  const initialState = defaultHomeState;
  it('should return the initial state', () => {
    expect(homeReducer(undefined, {} as HomeActionsType)).toEqual(initialState);
  });
  it('should handle rootAction.homeActions.fetchEpicAsync.request', () => {
    expect(homeReducer(initialState, rootAction.homeActions.fetchUsersAsync.request())).toEqual(
      produce<IHomeState>(initialState, (draft) => {
        draft.loading = true;
        draft.error = false;
      })
    );
  });
  it('should handle rootAction.homeActions.fetchEpicAsync.success', () => {
    expect(
      homeReducer(
        initialState,
        rootAction.homeActions.fetchUsersAsync.success({
          users: [],
          loading: false,
          error: false,
        })
      )
    ).toEqual(
      produce<IHomeState>(initialState, (draft) => {
        draft.users = [];
        draft.loading = false;
        draft.error = false;
      })
    );
  });
});
