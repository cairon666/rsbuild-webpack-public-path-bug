import { defineConfig } from "@rsbuild/core";
import path from "path";
import { pluginReact } from "@rsbuild/plugin-react";

const deps = require(path.resolve(
  process.cwd(),
  "./package.json"
)).dependencies;

export default defineConfig({
  output: {
    cleanDistPath: true,
  },
  source: {
    entry: {
      index: path.resolve(process.cwd(), "./src/index.ts"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 7001,
  },
  moduleFederation: {
    options: {
      library: { type: "var", name: "bug_rsbuild" },
      name: "bug_rsbuild",
      filename: "remoteEntry.js",
      exposes: {
        "./BugRsBuild": "./src/index.ts",
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
    },
  },
  plugins: [pluginReact()],
});
