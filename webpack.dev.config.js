//const fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
//const ExternalTemplateRemotesPlugin = require("./wpExternalTemplateRemotesPlugin");
const deps = require("./package.json").peerDependencies;

// const CustomNodeModule = {
//   fileName: "remoteModule.js",
//   name: "CustomRMInteraction",
//   port: 4000,
//   get url() {
//     return `//localhost:${this.port}`;
//   },
//   urlGlobalVariable: "CustomNodesUrl",
//   get federationConfig() {
//     // CustomRMInteraction@[window.CustomNodesUrl]/remoteModule.js
//     return `${this.name}@[window.${this.urlGlobalVariable}]/${this.fileName}`;
//   },
// };

module.exports = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Dumbot",
      shared: {
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
        grommet: deps.grommet,
      },
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  },
};
