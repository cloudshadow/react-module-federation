import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, filter, mergeMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, RootState, Services } from '@/types/GlobalTypes';
import rootAction from '@/actions';
import { getEpicRequest } from '@/apis/epicApis';

export const getEpicResponseDynamicEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
) => {
  return action$.pipe(
    filter(isActionOf(rootAction.epicActions.fetchEpicAsync.request)),
    mergeMap(() => from(getEpicRequest()).pipe(
      map((payload) => rootAction.epicActions.fetchEpicAsync.success(payload.data)),
      catchError((error) => of(rootAction.epicActions.fetchEpicAsync.failure(error)))
    ))
  );
}

export const getEpicResponseEpic: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  state$,
  api
) => {
  return action$.pipe(
    filter(isActionOf(rootAction.epicActions.fetchEpicAsync.request)),
    mergeMap(() => from(api.epicApis.getEpicRequest()).pipe(
      map((payload) => rootAction.epicActions.fetchEpicAsync.success(payload.data)),
      catchError((error) => of(rootAction.epicActions.fetchEpicAsync.failure(error)))
    ))
  );
}

