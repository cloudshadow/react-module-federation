import produce from 'immer';
import { ActionType, getType, createReducer } from 'typesafe-actions';
import rootAction from '@/actions';
import { ILoginState } from '@/types/AuthTypes';

export type ILoginActions = ActionType<typeof rootAction.authActions>;
export const defaultLoginState: ILoginState = { loading: false, error: false };

const login = createReducer<ILoginState, ILoginActions>(defaultLoginState)
  .handleType(getType(rootAction.authActions.loginEpicAsync.request), (state, action) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = false;
      console.log('request');
    })
  )
  .handleType(getType(rootAction.authActions.loginEpicAsync.success), (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = false;
      console.log('success');
    })
  )
  .handleType(getType(rootAction.authActions.loginEpicAsync.failure), (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = true;
    })
  )
  .handleType(getType(rootAction.authActions.loginThunkAsync.success), (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = false;
    })
  )
  .handleType(getType(rootAction.authActions.loginThunkAsync.failure), (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = true;
    })
  );

export default login;
