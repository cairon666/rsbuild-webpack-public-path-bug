import { OkWebpack } from "./OkWebpack";

function init() {
  console.log("ok", {__webpack_public_path__:__webpack_public_path__})
  __webpack_public_path__ = `${window.location.origin}/static/ok-webpack/`;
}

init();

export default OkWebpack;
