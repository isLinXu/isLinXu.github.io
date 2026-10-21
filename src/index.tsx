import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/layout/App";

// Old HashRouter links used /#/projects. Rewrite them to real paths before the
// router boots so existing bookmarks keep working.
const legacyPath = window.location.hash.replace(/^#/, "");
if (legacyPath.startsWith("/")) {
  window.history.replaceState(null, "", legacyPath);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
