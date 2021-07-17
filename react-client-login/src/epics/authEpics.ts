import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, switchMap, catchError, concatWith, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, RootState, Services } from '@/types/GlobalTypes';
import rootAction from '@/actions';
import { history } from '@/reducers';

// import axios, { AxiosResponse } from 'axios';
// import urlHelper from '@/utils/urlHelper';
// import { IAuthState, ILoginFrom } from '@/types/AuthTypes';
// export function loginObservable(payload: ILoginFrom): Promise<AxiosResponse<IAuthState>> {
//   return axios.post<IAuthState>(
//     urlHelper.t(urlHelper.servers.localServer, 'login'),
//     payload
//   );
// }

export const authLoginEpic: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  state$,
  api
) => {
  // console.log(api);
  return action$.pipe(
    filter(isActionOf(rootAction.authActions.loginEpicAsync.request)),
    switchMap((action) =>
      from(api.authApis.loginObservable(action.payload)).pipe(
        // from(loginObservable(action.payload)).pipe(
        // mergeMap((payload) =>
        //   of(
        //     rootAction.authActions.loginEpicAsync.success(payload.data)
        //   ).pipe(
        //     concatWith(
        //       // do some action after success
        //       of(rootAction.authActions.saveToken(payload.data)),
        //     )
        //   ).pipe(
        //     tap(action => localStorage.setItem('access_token', action.payload.accessToken))
        //   )
        // ),
        mergeMap((payload) =>
          of(
            rootAction.authActions.loginEpicAsync.success(payload.data),
            rootAction.authActions.saveToken(payload.data)
          ).pipe(
            tap((action) => {
              console.log(22222222222222);
              console.log(action.payload);
              localStorage.setItem('access_token', action.payload.accessToken);
              localStorage.setItem('refresh_token', action.payload.refreshToken);
              localStorage.setItem('user', JSON.stringify(action.payload.user));
              history.push('/home');
            })
          )
        ),
        catchError((error) => of(rootAction.authActions.loginEpicAsync.failure(error)))
      )
    )
  );
};
