import { combineReducers } from 'redux';
import { createBrowserHistory, History } from 'history';
import { connectRouter } from 'connected-react-router';
import epic from './epicReducer';

export const history: History = createBrowserHistory();
const rootReducer = combineReducers({
  epic,
  router: connectRouter(history),
});

export default rootReducer;
