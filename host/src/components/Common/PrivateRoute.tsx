import * as React from 'react';
import { Redirect } from 'react-router';
// import Navbar from '@/components/Common/Navbar/Navbar';

interface IPrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = (props: IPrivateRouteProps) => {
  // can not get accessToken from status because do the history.push before the reducer
  const accessToken = localStorage.getItem('access_token');
  // const authState = useSelector<RootState, IAuthState>((state) => state.auth, shallowEqual);
  return accessToken ? (
    <React.Fragment>
      {/* <Navbar /> */}
      {props.children}
    </React.Fragment>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
