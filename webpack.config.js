module.exports = {
  entry: {
    app:"./src/app/js/app.js"
  },
  output: {
    filename: "[name].min.js",
    path:  "./dist/assets/app/js",
    publicPath: "/assets/app/js/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ "babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      }
    ],
  },
  watch: true,
}
