import * as React from 'react';
import { getThunkRequest } from '@/apis/epicApis';
import { IEpicState } from '@/types/EpicTypes';
import './epic.scss';

interface IEpicProps {
  fetchThunk: (temp: IEpicState) => void;
  fetchEpicRequest: () => void;
  epicState: IEpicState;
}
const EpicComponent: React.FunctionComponent<IEpicProps> = React.memo(
  ({ fetchThunk, fetchEpicRequest, epicState }) => {
    React.useEffect(() => {
      // Get data by thunk
      getThunkRequest().then((payload) => {
        fetchThunk(payload.data);
      });

      // Get data by epic
      // magic setTimeout 
      setTimeout(() => {
        fetchEpicRequest();
      }, 1)

    }, []);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">{epicState ? epicState.text : ''}</div>
          <div className="col-sm-12">
            {epicState ? epicState.epicText : ''}
          </div>
        </div>
      </div>
    );
  }
);

export default EpicComponent;
