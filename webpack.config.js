module.exports = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      './src/js/app.jsx'
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?optional[]=runtime'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  }
};
