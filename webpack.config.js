// webpack.config.js
var path = require('path');

module.exports = {
  entry: './frontend/entry.js',
  output: {
    filename: './bundle.js',
  },
  module: {
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
