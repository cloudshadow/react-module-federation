import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import rootReducer, { history } from '@/reducers';
import { routerMiddleware } from 'connected-react-router';
import rootEpic from '@/epics';
import services from '@/apis';
import { RootAction, RootState, Services } from '@/types/GlobalTypes';

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, Services>({
  dependencies: services,
});

function configureStoreProd(preloadedState?: any) {
  const middlewares = [
    // Add other middleware on this line...
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
    epicMiddleware,
    routerMiddleware(history),
  ];

  let store = createStore(combineReducers(rootReducer), compose(applyMiddleware(...middlewares)));
  const nextReducer = require('@/reducers').default; // eslint-disable-line global-require
  store = {
    ...store,
    asyncReducers: {},
    injectReducer: (key, asyncReducer) => {
      store.asyncReducers[key] = asyncReducer;
      store.replaceReducer(createReducer(nextReducer, store.asyncReducers));
    },
  };
  epicMiddleware.run(rootEpic);

  return store;
}

function configureStoreDev(preloadedState?: any) {
  const middlewares = [
    // Add other middleware on this line...
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
    epicMiddleware,
    routerMiddleware(history),
  ];

  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  let store = createStore(createReducer(rootReducer, {}), composeEnhancers(applyMiddleware(...middlewares)));
  const nextReducer = require('@/reducers').default; // eslint-disable-line global-require
  store = {
    ...store,
    asyncReducers: {},
    injectReducer: (key, asyncReducer) => {
      store.asyncReducers[key] = asyncReducer;
      store.replaceReducer(createReducer(nextReducer, store.asyncReducers));
    },
  };
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('@/reducers', () => {
      store.replaceReducer(createReducer(nextReducer, store.asyncReducers));
    });
  }
  epicMiddleware.run(rootEpic);

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

function createReducer(staticReducers: any, asyncReducers: any): any {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

export default configureStore;
