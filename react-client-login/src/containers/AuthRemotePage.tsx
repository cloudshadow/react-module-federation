import * as React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import rootAction from '@/actions';
import LoginRemoteComponent from '@/components/Auth/LoginRemote/LoginComponent';
import { RootState } from '@/types/GlobalTypes';
import { IAuthState, ILoginFrom, ILoginState } from '@/types/AuthTypes';
import { History } from 'history';

interface ILoginPageProps {
  history: History;
}

const LoginPage: React.FC<ILoginPageProps> = ({ history }) => {
  const dispatch = useDispatch();
  const loginState = useSelector<RootState, ILoginState>((state) => {
    return state.login;
  }, shallowEqual);
  return (
    <LoginRemoteComponent
      dispatchLoginThunkSuccess={(args: IAuthState) =>
        dispatch(rootAction.authActions.loginThunkAsync.success(args))
      }
      dispatchLoginEpicRequest={(args: ILoginFrom) =>
        dispatch(rootAction.authActions.loginEpicAsync.request(args))
      }
      dispatchSaveToken={(args: IAuthState) =>
        dispatch(rootAction.authActions.saveToken(args))
      }
      history={history}
      loginState={loginState}
    />
  );
};

export default LoginPage;
