import { BugRsBuild } from "./BugRsBuild";

function init() {
  console.log("bug", { __webpack_public_path__: __webpack_public_path__ });
  __webpack_public_path__ = `${window.location.origin}/static/bug-rsbuild/`;
}

init();

export default BugRsBuild;
