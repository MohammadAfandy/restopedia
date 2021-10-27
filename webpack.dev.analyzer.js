const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

const dev = require('./webpack.dev');

module.exports = merge(dev, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 'auto',
    }),
  ],
});
