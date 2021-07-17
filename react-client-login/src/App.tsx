import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import LoginPage from './containers/AuthPage';
import HomePage from './containers/HomePage';
import NotfoundPage from './containers/NotfoundPage';
import configureStore from './stores/configureStore';
import PrivateRoute from '@/components/Common/PrivateRoute';
import { history } from '@/reducers';
import { interceptorRequest, interceptorResponse } from '@/utils/axiosHelp';

const store = configureStore();
interceptorRequest();
interceptorResponse();

// store.subscribe(() => {
// });
const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      {/* ConnectedRouter will use the store from Provider automatically */}
      {/* use env process.env.NODE_ENV or process.env.REACT_APP_ENV*/}
      <ConnectedRouter history={history}>
        <div className="index-container">
          <div className="switch-container">
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route path="/home">
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              </Route>
              <Route path="*">
                <NotfoundPage />
              </Route>
            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
