import produce from 'immer';
import { ActionType, getType, createReducer } from 'typesafe-actions';
import rootAction from '@/actions';
import { IAuthState } from '@/types/AuthTypes';

export type IAuthActions = ActionType<typeof rootAction.authActions>;
export const defaultAuthState: IAuthState = {
  accessToken: localStorage.getItem('access_token') || '',
  refreshToken: localStorage.getItem('refresh_token') || '',
  user: JSON.parse(localStorage.getItem('user') || '{}'),
};

const auth = createReducer<IAuthState, IAuthActions>(defaultAuthState).handleType(
  getType(rootAction.authActions.saveToken),
  (state, action) =>
    produce(state, (draft) => {
      draft.accessToken = action.payload.accessToken;
      draft.refreshToken = action.payload.refreshToken;
      draft.user = action.payload.user;
    })
);

export default auth;
