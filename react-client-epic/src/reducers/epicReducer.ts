import produce from 'immer';
import { ActionType, getType, createReducer } from 'typesafe-actions';
import rootAction from '@/actions';
import { IEpicState } from '@/types/EpicTypes';
export type IEpicActions = ActionType<typeof rootAction.epicActions>;
export const defaultEpicState: IEpicState = { id: 0, text: '', epicText: '' };

const epic = createReducer<IEpicState, IEpicActions>(defaultEpicState)
  .handleType(getType(rootAction.epicActions.fetchThunk), (state, action) =>
    produce(state, (draft) => {
      draft.id = action.payload.id;
      draft.text = action.payload.text;
    })
  )
  .handleType(getType(rootAction.epicActions.fetchEpicAsync.success), (state, action) =>
    produce(state, (draft) => {
      draft.id = action.payload.id;
      draft.epicText = action.payload.epicText;
    })
  );

export default epic;
