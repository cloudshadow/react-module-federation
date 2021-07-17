import { createBrowserHistory, History } from 'history';
import { connectRouter } from 'connected-react-router';

export const history: History = createBrowserHistory();
const rootReducer: any = {
  router: connectRouter(history),
};

export default rootReducer;
