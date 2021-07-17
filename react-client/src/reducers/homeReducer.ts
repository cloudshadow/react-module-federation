import produce from 'immer';
import { ActionType, getType, createReducer } from 'typesafe-actions';
import rootAction from '@/actions';
import { IHomeState } from '@/types/HomeTypes';

export type IHomeActions = ActionType<typeof rootAction.homeActions>;
export const defaultHomeState: IHomeState = { users: [], loading: false, error: false };
const home = createReducer<IHomeState, IHomeActions>(defaultHomeState)
  .handleType(getType(rootAction.homeActions.fetchUsersAsync.success), (state, action) =>
    produce(state, (draft) => {
      draft.users = action.payload.users
    })
  );

export default home;
