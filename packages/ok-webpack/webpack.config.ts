import path from "path";
import "webpack-dev-server";
import webpack from "webpack";

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
    host: "0.0.0.0",
    port: 7003,
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
      library: { type: "var", name: "ok_webpack" },
      name: "ok_webpack",
      filename: "remoteEntry.js",
      exposes: {
        "./OkWebpack": "./src/index.tsx",
      },
      shared: {
        react: {
          singleton: true,
          version: deps["react"],
        },
        "react-dom": {
          singleton: true,
          version: deps["react-dom"],
        },
      },
    }),
  ],
};

export default config;
