import * as React from 'react';
import { IAuthState, ILoginFrom, ILoginState } from '@/types/AuthTypes';
import './login.scss';
import { loginThunk } from '@/apis/authApis';
import { History } from 'history';

// React.memo instead of PureComponent
interface ILoginProps {
  dispatchLoginEpicRequest: (args: ILoginFrom) => void;
  dispatchSaveToken: (args: IAuthState) => void;
  dispatchLoginThunkSuccess: (args: IAuthState) => void;
  history: History;
  loginState: ILoginState;
}

const LoginComponent: React.FunctionComponent<ILoginProps> = React.memo(
  ({
    loginState,
    dispatchLoginEpicRequest,
    dispatchLoginThunkSuccess,
    dispatchSaveToken,
    history,
  }) => {
    const [userInfo, setUserInfo] = React.useState<ILoginFrom>({
      username: '',
      password: '',
    });
    const handleLogin = (userInfo: ILoginFrom) => {
      loginThunk(userInfo).then((payload) => {
        dispatchLoginThunkSuccess(payload.data);
        dispatchSaveToken(payload.data);
        localStorage.setItem('access_token', payload.data.accessToken);
        localStorage.setItem('refresh_token', payload.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(payload.data.user));
        history.push('/home');
      });
    };

    if (loginState && loginState.loading) return <p>Loading...</p>;
    if (loginState && loginState.error) return <p>Error :(</p>;
    return (
      <div className="container-fluid login-container">
        <div className="row">
          <div className="col"> login page </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => {
                setUserInfo({ ...userInfo, username: e.target.value });
              }}
              value={userInfo.username}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
              value={userInfo.password}
            />
          </div>
          <div className="mb-3">
            {/* <button
              onClick={(e) => {
                dispatchLoginEpicRequest(userInfo);
              }}
            >
              Login
            </button> */}
            <button
              onClick={(e) => {
                handleLogin(userInfo);
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default LoginComponent;
