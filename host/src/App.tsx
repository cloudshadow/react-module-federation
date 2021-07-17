import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import GraphqlPage from './containers/GraphqlPage';
import NotfoundPage from './containers/NotfoundPage';
import configureStore from './stores/configureStore';
import { history } from '@/reducers';
import PrivateRoute from '@/components/Common/PrivateRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { interceptorRequest, interceptorResponse } from '@/utils/axiosHelp';
import { rootEpic$ } from './epics';
// import services from '@/apis';

const store = configureStore();
interceptorRequest();
interceptorResponse();
const RemoteHome = React.lazy(() => import('react_client/Home'));
const RemoteLogin = React.lazy(() => import('react_client_login/Login'));
const RemoteEpic = React.lazy(() => import('react_client_epic/Epic'));

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      {/* ConnectedRouter will use the store from Provider automatically */}
      {/* use env process.env.NODE_ENV or process.env.REACT_APP_ENV*/}
      <React.Suspense fallback={<div>Loading...</div>}>
        <ConnectedRouter history={history}>
          <div className="index-container">
            {/* <Navbar /> */}
            <div className="switch-container">
              <Switch>
                <Route exact path="/login">
                  <ErrorBoundary componentName="RemoteLogin">
                    <React.Suspense fallback="Loading...">
                      <RemoteLogin store={store} history={history} />
                    </React.Suspense>
                  </ErrorBoundary>
                </Route>
                <Route path="/home">
                  <PrivateRoute>
                    <ErrorBoundary componentName="RemoteHome">
                      <React.Suspense fallback="Loading...">
                        <RemoteHome store={store} />
                      </React.Suspense>
                    </ErrorBoundary>
                  </PrivateRoute>
                </Route>
                <Route path="/epic">
                  <PrivateRoute>
                    <ErrorBoundary componentName="RemoteEpic">
                      <React.Suspense fallback="Loading...">
                        <RemoteEpic store={store} rootEpic$={rootEpic$} />
                      </React.Suspense>
                    </ErrorBoundary>
                  </PrivateRoute>
                </Route>
                <Route path="/graphql">
                  <GraphqlPage />
                </Route>
                <Route path="*">
                  <NotfoundPage />
                </Route>
              </Switch>
            </div>
          </div>
        </ConnectedRouter>
      </React.Suspense>
    </Provider>
  );
};

export default App;
