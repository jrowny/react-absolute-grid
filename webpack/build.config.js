module.exports = {
  entry: './index.js',
  output: {
    path: './dist',
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'AbsoluteGrid'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
      loader: 'babel' // The module to load. "babel" is short for "babel-loader"
    }]
  },
  externals: {
    react: 'react'
  }
};


