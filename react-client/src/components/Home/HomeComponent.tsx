import * as React from 'react';
import { fetchUsers } from '@/apis/homeApis';
import { IHomeState } from '@/types/HomeTypes';
import './home.scss';
interface IHomeProps {
  dispatchFetchUsers: (args: IHomeState) => void;
  homeState: IHomeState;
}

const HomeComponent: React.FunctionComponent<IHomeProps> = React.memo(({ dispatchFetchUsers, homeState }) => {
  React.useEffect(() => {
    // Get data by thunk
    fetchUsers().then((payload) => {
      dispatchFetchUsers(payload.data);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">home page ( with React Version {React.version} ) </div>
        <table>
          <thead>
            <tr>
              <td>Email</td>
              <td>User Name</td>
              <td>Phone</td>
            </tr>
          </thead>
          <tbody>
            {homeState &&
              homeState.users.map((user) => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default HomeComponent;
