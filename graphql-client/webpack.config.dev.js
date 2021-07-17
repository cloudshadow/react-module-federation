const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HappyPack = require('happypack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        // loader: 'babel-loader',
        use: 'happypack/loader',
        exclude: /node_modules/,
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        //type: 'javascript/auto',
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //type: 'javascript/auto',
        use: ['url-loader?limit=10000&mimetype=application/font-woff'],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        //type: 'javascript/auto',
        use: ['url-loader?limit=10000&mimetype=application/octet-stream'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        //type: 'javascript/auto',
        use: ['url-loader?limit=10000&mimetype=image/svg+xml'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        //type: 'javascript/auto',
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /\.ico$/,
        //type: 'javascript/auto',
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://0.0.0.0:4003/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new HappyPack({
      use: ['babel-loader'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: 'graphql_client',
      library: { type: 'var', name: 'graphql_client' },
      filename: 'remoteEntry.js',
      exposes: {
        './UsersList': './src/App',
        // './UsersList': './src/containers/UsersListPage',
      },
      shared: {
        ...deps,
        // react: {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['react']
        // },
        // 'react-dom': {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['react-dom']
        // },
        // '@apollo/react-hooks': {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['@apollo/react-hooks']
        // },
        // 'apollo-client': {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['apollo-client']
        // },
        // 'apollo-boost': {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['apollo-boost']
        // },
        // 'apollo-cache-inmemory': {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['apollo-cache-inmemory']
        // },
        // 'apollo-link-http': {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['apollo-link-http']
        // },
        // graphql: {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['graphql']
        // },
        // 'graphql-tag': {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['graphql-tag']
        // },
        // history: {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['history']
        // },
        // 'jwt-decode': {
        //   // eager: true,
        //   singleton: true,
        //   requiredVersion: deps['jwt-decode']
        // }
      },
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    inline: true,
    compress: true,
    host: '0.0.0.0',
    port: 4003,
    progress: true,
    open: true,
    // hot: true, //see more https://github.com/webpack/webpack/issues/1151
    watchContentBase: true,
    historyApiFallback: true,
  },
};
