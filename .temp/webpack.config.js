'use strict';

const path = require('path');
const debug = require('debug');
const webpack = require('webpack');
const glob = require('glob');

// const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

debug.enable('app:*');
const log = debug('app:webpack');

log('Environment set to development mode.');

const appEnv = (process.env.NODE_ENV || 'development');
const isProduction = (appEnv === 'production');

const appPath = path.join(__dirname, 'client');
const buildPath = path.join(__dirname, 'public');

const config = {
  // watch: true,
  context: __dirname + '/client',
  entry: {
    vendor: [
      'angular/angular.min.js',
      'angular-route/angular-route.min.js',
      // 'jquery',
    ],
    'ems-app': [
      appPath + '/scripts/app.js',
      ...glob.sync(appPath + '/scripts/*.js', { 'ignore': ['**/app.js'] }),
    ],
  },
  output: {
    // publicPath: '/',
    path: buildPath,
    // filename: '[name].[hash].js',
    // chunkFilename: '[name].[hash].js',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    modules: ['./node_modules', appPath],
    // alias: {
    //   npm: __dirname + '/node_modules',
    // },
    // extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
      // { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css?minimize!postcss!sass') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      {
        test: /\.scss$/, include: [path.resolve(__dirname, 'client', 'styles')],
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] })
      },
      { test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.(jpg|jpeg|gif|png|svg)$/i, loader: 'file?name=images/[name].[ext]' },
      { test: /\.(json)$/, loader: 'file-loader?name=[path][name].[ext]' },
    ],
    rules: [
      { test: /\.jsx?$/, loader: 'babel', include: [path.resolve(appPath, 'scripts')] },
      // { test: /\.s?css$/, loaders: ['style', 'css', 'sass', 'postcss-loader'] },
      // { test: /\.s?css$/, loader: 'style!css!sass?outputStyle=expanded', },
      // {
      //   test: /\.s?css$/, loader: ExtractTextPlugin.extract({
      //     use: [
      //       { loader: 'css-loader' },
      //       { loader: 'sass-loader' },
      //     ],
      //     fallback: 'style-loader'
      //   }),
      // },
      // {
      //   test: /\.(jpe?g|png|gif)(\?.*)?$/i, use: [{
      //     loader: 'file',
      //     options: { name: '[path][name].[hash].[ext]' }
      //   }]
      // },

      { test: /\.svg(\?.*$|$)/, loader: 'file?name=img/[name].[ext]' },
      { test: /\.(png|gif|jpe?g)$/i, loader: 'file?name=img/[name].[ext]' },
      { test: /\.html?$/, loader: 'file?name=[name].[ext]' },
      { test: /\.(eot|ttf|woff2?)(\?.*$|$)/, loader: 'file?name=[name].[ext]&publicPath=../fonts/&outputPath=/public/fonts/' }

    ],
    preLoaders: [
      { test: /\.js$/, loader: 'eslint', include: [path.resolve(appPath)] },
    ],
    noParse: [
      /angular\.src\.js/
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin(['vendor', 'ems-app'], '[name].[hash].js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // https://github.com/webpack/webpack/issues/1496
      }
    }),
    // new ExtractTextPlugin('./public/style.css', { allChunks: true }),
    new ExtractTextPlugin({ filename: '[name].min.css', allChunks: true }),
    new HtmlWebpackPlugin({
      //title: 'EMS',
      filename: 'index.html',
      template: path.resolve(__dirname, 'client', 'index.html'),
      inject: 'body',
    }),
    // new CopyWebpackPlugin([]),
  ],
  devtool: isProduction ? 'source-map' : 'eval-source-map', // 'inline-source-map'

  // devServer: {
  //   contentBase: './client', port: 1337
  // },

  compiler: {
    hash_type: 'hash',
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true,
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  eslint: {
    configFile: './.eslintrc'
  },
};

exports = module.exports = config;
