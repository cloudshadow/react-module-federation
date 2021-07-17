import { combineReducers } from 'redux';
import { createBrowserHistory, History } from 'history';
import { connectRouter } from 'connected-react-router';
import auth from './authReducer';
import login from './loginReducer';
import home from './homeReducer';

export const history: History = createBrowserHistory();
const rootReducer = combineReducers({
  auth,
  login,
  home,
  router: connectRouter(history),
});

export default rootReducer;
