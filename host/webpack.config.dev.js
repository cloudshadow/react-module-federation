const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const HappyPack = require('happypack');
const moduleFederationConfig = require('./webpack.module.federation.config');
const deps = require('./package.json').dependencies;
const mode = 'development';

module.exports = {
  mode,
  target: mode === 'development' ? 'web' : 'browserslist',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  cache: {
    type: 'memory',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: ['happypack/loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?limit=10000&mimetype=application/font-woff'],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=application/octet-stream'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=image/svg+xml'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /\.ico$/,
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
    publicPath: 'http://0.0.0.0:4001/',
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
    new webpack.EnvironmentPlugin({
      REACT_APP_ENV: 'development',
    }),
    new ModuleFederationPlugin(
      moduleFederationConfig(deps).hostConfig
    ),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    inline: true,
    compress: true,
    host: '0.0.0.0',
    port: 4001,
    progress: true,
    open: true,
    // hot: true, //see more https://github.com/webpack/webpack/issues/1151
    watchContentBase: true,
    historyApiFallback: true,
  },
};
