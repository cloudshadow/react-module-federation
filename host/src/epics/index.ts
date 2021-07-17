import { BehaviorSubject } from 'rxjs';
import { RootAction, RootState, Services } from '@/types/GlobalTypes';
import { combineEpics } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';

export const rootEpic$ = new BehaviorSubject(combineEpics());
const rootEpic = (action$: RootAction, state$: RootState, api: Services) => {
  return rootEpic$.pipe(mergeMap((epic) => epic(action$, state$, api)))
};

export default rootEpic;

