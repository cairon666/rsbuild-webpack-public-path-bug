import path from "path";
import "webpack-dev-server";
import webpack from "webpack";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

const deps = require(path.resolve(
  process.cwd(),
  "./package.json"
)).dependencies;

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 7002,
    host: "0.0.0.0",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      shared: {
        react: {
          eager: true,
          singleton: true,
          version: deps["react"],
        },
        "react-dom": {
          eager: true,
          singleton: true,
          version: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};

export default config;
