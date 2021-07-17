import { combineEpics } from 'redux-observable';
import * as epicEpics from './epicEpics';
const rootEpic = combineEpics(...Object.values(epicEpics));

export default rootEpic;
