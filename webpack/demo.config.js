var path = require('path');
var webpack = require('webpack');

var config = {
  entry: [path.resolve(__dirname, '../demo.js')],
  output: {
    path: path.resolve(__dirname, '../demo'),
    filename: 'AbsoluteGrid.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
      loader: 'babel' // The module to load. "babel" is short for "babel-loader"
    }]
  }
};

module.exports = config;
