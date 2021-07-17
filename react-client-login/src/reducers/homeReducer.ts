import produce from 'immer';
import { ActionType, getType, createReducer } from 'typesafe-actions';
import rootAction from '@/actions';
import { IHomeState } from '@/types/HomeTypes';

export type IHomeActions = ActionType<typeof rootAction.homeActions>;
export const defaultHomeState: IHomeState = { id: 0, text: '', epicText: '' };

const home = createReducer<IHomeState, IHomeActions>(defaultHomeState)
  .handleType(getType(rootAction.homeActions.fetchThunk), (state, action) =>
    produce(state, (draft) => {
      draft.id = action.payload.id;
      draft.text = action.payload.text;
    })
  )
  .handleType(getType(rootAction.homeActions.fetchEpicAsync.success), (state, action) =>
    produce(state, (draft) => {
      draft.id = action.payload.id;
      draft.epicText = action.payload.epicText;
    })
  );

export default home;
