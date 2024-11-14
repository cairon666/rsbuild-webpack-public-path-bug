import { importRemote } from "@module-federation/utilities";
import React, { Suspense } from "react";

const BugRsBuild = React.lazy(() =>
  importRemote({
    url: "/bug-rsbuild/static",
    // url: "http://localhost:7001",
    scope: "bug_rsbuild",
    module: "BugRsBuild",
    remoteEntryFileName: "remoteEntry.js",
  })
);
const OkWebpack = React.lazy(() =>
  importRemote({
    url: "/ok-webpack/static",
    // url: "http://localhost:7003",
    scope: "ok_webpack",
    module: "OkWebpack",
    remoteEntryFileName: "remoteEntry.js",
  })
);

export function Host() {
  const [renderBug, setRenderBug] = React.useState(false);
  const [renderOk, setRenderOk] = React.useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setRenderBug(!renderBug)}>
          toggle render bug
        </button>
        <button onClick={() => setRenderOk(!renderOk)}>toggle render ok</button>
      </div>
      {renderBug && (
        <Suspense>
          <BugRsBuild />
        </Suspense>
      )}
      {renderOk && (
        <Suspense>
          <OkWebpack />
        </Suspense>
      )}
    </div>
  );
}
