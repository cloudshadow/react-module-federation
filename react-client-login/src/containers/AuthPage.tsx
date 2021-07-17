import * as React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import rootAction from '@/actions';
import LoginComponent from '@/components/Auth/Login/LoginComponent';
import { RootState } from '@/types/GlobalTypes';
import { IAuthState, ILoginFrom, ILoginState } from '@/types/AuthTypes';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const loginState = useSelector<RootState, ILoginState>((state) => {
    return state.login;
  }, shallowEqual);
  return (
    <LoginComponent
      dispatchLoginThunkSuccess={(args: IAuthState) =>
        dispatch(rootAction.authActions.loginThunkAsync.success(args))
      }
      dispatchLoginEpicRequest={(args: ILoginFrom) =>
        dispatch(rootAction.authActions.loginEpicAsync.request(args))
      }
      dispatchSaveToken={(args: IAuthState) =>
        dispatch(rootAction.authActions.saveToken(args))
      }
      loginState={loginState}
    />
  );
};

export default LoginPage;
