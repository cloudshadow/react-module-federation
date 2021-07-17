import * as React from 'react';
import { Provider } from 'react-redux';
import EpicRemotePage from './containers/EpicRemotePage';
import epic from '@/reducers/epicReducer';
import * as epicEpics from '@/epics/epicEpics';

interface IAppRemoteProps {
  store: any;
  rootEpic$: any;
}
const AppRemote: React.FunctionComponent<IAppRemoteProps> = (props: IAppRemoteProps) => {
  // const { store, rootEpic, services, history } = props;
  const { store, rootEpic$ } = props;
  React.useEffect(() => {
    store.injectReducer('epic', epic);
    rootEpic$.next(...Object.values(epicEpics));
  }, []);

  return (
    <Provider store={store}>
      <div className="index-container">
        <div className="switch-container">
          <EpicRemotePage />
        </div>
      </div>
    </Provider>
  );
};

export default AppRemote;
