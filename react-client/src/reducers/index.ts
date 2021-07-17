// import { combineReducers } from 'redux';
import { createBrowserHistory, History } from 'history';
import { connectRouter } from 'connected-react-router';
// import home from './homeReducer';
import home from './homeReducer';

export const history: History = createBrowserHistory();
const rootReducer = {
  home,
  router: connectRouter(history),
};

export default rootReducer;
