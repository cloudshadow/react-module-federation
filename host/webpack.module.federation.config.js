module.exports = (deps) => ({
  hostConfig: {
    name: 'host',
    remotes: {
      react_client: `react_client@http://0.0.0.0:4002/remoteEntry.js?${Date.now()}`,
      graphql_client: `graphql_client@http://0.0.0.0:4003/remoteEntry.js?${Date.now()}`,
      react_client_login: `react_client_login@http://0.0.0.0:4005/remoteEntry.js?${Date.now()}`,
      react_client_epic: `react_client_epic@http://0.0.0.0:4006/remoteEntry.js?${Date.now()}`,
    },
    shared: {
      ...deps,
      react: {
        // import: 'react',
        // shareKey: 'react',
        shareScope: 'default',
        singleton: true, // only a single version of the shared module is allowed
        requiredVersion: deps['react'],
      },
      'react-dom': {
        eager: false,
        singleton: true,
        requiredVersion: deps['react-dom'],
      },
      'react-redux': {
        eager: false,
        singleton: true,
        requiredVersion: deps['react-redux'],
      },
      redux: {
        eager: false,
        singleton: true,
        requiredVersion: deps['redux'],
      },
      history: {
        eager: false,
        singleton: true,
        requiredVersion: deps['history'],
      },
      'typesafe-actions': {
        eager: false,
        singleton: true,
        requiredVersion: deps['typesafe-actions'],
      },
      axios: {
        eager: false,
        singleton: true,
        requiredVersion: deps['axios'],
      },
      'redux-observable': {
        eager: false,
        singleton: true,
        requiredVersion: deps['redux-observable'],
      },
      rxjs: {
        eager: false,
        singleton: true,
        requiredVersion: deps['rxjs'],
      },
      'redux-thunk': {
        eager: false,
        singleton: true,
        requiredVersion: deps['redux-thunk'],
      },
    },
  },
  clientConfig: {
    name: 'react_client',
    library: { type: 'var', name: 'react_client' },
    filename: 'remoteEntry.js',
    exposes: {
      './Home': './src/Containers/HomePage',
    },
    shared: {
      ...deps,
    },
  },
});