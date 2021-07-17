module.exports = (deps) => ({
  hostConfig: {
    name: 'host',
    remotes: {
      react_client: `react_client@http://0.0.0.0:4002/remoteEntry.js`,
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
    name: 'react_client_epic',
    library: { type: 'var', name: 'react_client_epic' },
    filename: 'remoteEntry.js',
    exposes: {
      './Epic': './src/AppRemote',
    },
    shared: {
      ...deps,
    },
  },
});