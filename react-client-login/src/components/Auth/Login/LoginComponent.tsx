import * as React from 'react';
import { IAuthState, ILoginFrom, ILoginState } from '@/types/AuthTypes';
import './login.scss';

interface ILoginProps {
  dispatchLoginEpicRequest: (args: ILoginFrom) => void;
  dispatchLoginThunkSuccess: (args: IAuthState) => void;
  dispatchSaveToken: (args: IAuthState) => void;
  loginState: ILoginState;
}

const LoginComponent: React.FunctionComponent<ILoginProps> = React.memo(
  ({
    loginState,
    dispatchLoginEpicRequest,
    // dispatchLoginThunkSuccess,
    // dispatchSaveToken,
  }) => {
    const [userInfo, setUserInfo] = React.useState<ILoginFrom>({
      username: '',
      password: '',
    });

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
            <button
              onClick={() => {
                dispatchLoginEpicRequest(userInfo);
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
