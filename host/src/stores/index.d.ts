/// <reference types="redux" />

export interface Action<T = any> {
  type: T;
}
export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}
declare module 'redux' {
  interface Store<S = any, A extends Action = AnyAction> {
    asyncReducers: any;
    injectReducer(key: string, asyncReducer: Reducer<S, A>): void;
  }
}
