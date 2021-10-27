const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  // to fix syntax error on workbox when minimizer is true and on dev mode
  devtool: 'eval-cheap-source-map',
  devServer: {
    port: 9191,
    contentBase: path.resolve(__dirname, 'dist'),
  },
});
