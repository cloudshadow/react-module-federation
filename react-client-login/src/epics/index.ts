import { combineEpics } from 'redux-observable';
import * as homeEpics from './homeEpics';
import * as loginEpics from './authEpics';
const rootEpic = combineEpics(...Object.values(loginEpics), ...Object.values(homeEpics));

export default rootEpic;
