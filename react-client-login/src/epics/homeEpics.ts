import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, RootState, Services } from '@/types/GlobalTypes';
import rootAction from '@/actions';

export const getHomeResponseEpic: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  state$,
  api
) =>
  action$.pipe(
    filter(isActionOf(rootAction.homeActions.fetchEpicAsync.request)),
    switchMap(() =>
      from(api.homeApis.getEpicRequest()).pipe(
        map((payload) => rootAction.homeActions.fetchEpicAsync.success(payload.data)),
        catchError((error) => of(rootAction.homeActions.fetchEpicAsync.failure(error)))
      )
    )
  );
