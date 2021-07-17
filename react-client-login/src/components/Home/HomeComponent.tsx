import * as React from 'react';
import { getThunkRequest } from '@/apis/homeApis';
import { IHomeState } from '@/types/HomeTypes';
import './home.scss';

interface IHomeProps {
  fetchThunk: (temp: IHomeState) => void;
  fetchEpicRequest: () => void;
  homeState: IHomeState;
}
const HomeComponent: React.FunctionComponent<IHomeProps> = React.memo(
  ({ fetchThunk, fetchEpicRequest, homeState }) => {
    React.useEffect(() => {
      // Get data by thunk
      getThunkRequest().then((payload) => {
        fetchThunk(payload.data);
      });

      // Get data by epic
      fetchEpicRequest();
    }, []);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">home page</div>
        </div>
      </div>
    );
  }
);

export default HomeComponent;
