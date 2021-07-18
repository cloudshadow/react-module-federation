<p align="center"><img src="https://user-images.githubusercontent.com/1182967/34776160-d0cdee06-f650-11e7-8119-b42c0c324e8f.png"/></p>

# React Module Federation

> React module federation demo.

## Libraries

- [Webpack](https://webpack.js.org/) v5.44.0
- [React](https://reactjs.org/) v17.0.2+
- [TypeScript](https://www.typescriptlang.org/)
- [ImmerJs](https://immerjs.github.io/immer/)
- [React Router](https://reacttraining.com/react-router/)
- [Redux](https://redux.js.org/)
- [Redux-Observable](https://redux-observable.js.org/)
- [Redux-thunk](https://github.com/reduxjs/redux-thunk)
- [Axios](https://github.com/axios/axios)
- [Babel](https://babeljs.io/)

## Feature

- Include Jwt demo
- Support redux-thunk
- Support redux-observable
- Support dynamic inject redux store
- Support dynamic inject redux-observable
- Support GraphQL
- Support mutilple api server
- Support local api with json
- Support generate template code
- Support husky


## Project directory

### host
> It's the top-level app, which depends on `react-client` , `react-client-login`, `react-client-epic`, `graphql-client`.
I think we should put the state and function what will be shared code in the top-level app. (like Auth and Router)

### react-client (Container)
> It's the low-level app, shared the home container for the host.

### react-client-login (Container)
> It's the low-level app, shared the login container for the host, after login suceess will redirect to the react-client home container.

### react-client-epic (Container)
> It's the low-level app, shared the epic container for the host. (Show you how to inject into redux-observable)

### graphql-client (Component)
> It's the low-level app, shared the graphQL component for the host.
