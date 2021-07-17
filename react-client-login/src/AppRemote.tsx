import * as React from 'react';
import { Provider } from 'react-redux';
import AuthPage from '@/containers/AuthRemotePage';
import login from '@/reducers/loginReducer';
import auth from '@/reducers/authReducer';
import { History } from 'history';
// import * as homeEpics from '@/epics/homeEpics';
// import * as loginEpics from '@/epics/authEpics';
// import router from '@/reducers';
interface IAppRemoteProps {
  store: any;
  rootEpic$: any;
  history: History;
}
const AppRemote: React.FunctionComponent<IAppRemoteProps> = (props: IAppRemoteProps) => {
  // const { store, rootEpic, services, history } = props;
  const { store, history, rootEpic$ } = props;
  React.useEffect(() => {
    store.injectReducer('auth', auth);
    store.injectReducer('login', login);
    // rootEpic$.next(...Object.values(loginEpics));
    // rootEpic().injectEpics(...Object.values(loginEpics));
  }, []);

  return (
    <Provider store={store}>
      <div className="index-container">
        <div className="switch-container">
          {/* <AuthPage history={history} /> */}
          <AuthPage history={history} />
        </div>
      </div>
    </Provider>
  );
};

export default AppRemote;
