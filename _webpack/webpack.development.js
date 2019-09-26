const { paths, entry, devServer, app } = require("../project-config");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    hot: devServer.hot,
    port: devServer.port,
    host: devServer.ip,
    open: devServer.open,
    historyApiFallback: true
  },
  context: paths.compiled,
  entry: entry,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["react-hot-loader/babel"]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      title: app.title,
      template: `!!pug-loader!${paths.HTMLTemplate}`,
      inject: false
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(process.env.API_URL)
    })
  ],
  resolve: {
    alias: paths.aliases,
    modules: [paths.compiled, "node_modules"]
  }
};
