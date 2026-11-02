import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Browsers fire this benign notice when a layout-measuring library (3D canvas,
// animations) resizes within one frame. Nothing is broken, but error overlays
// treat it as a crash — swallow only this exact message.
const isResizeObserverNoise = (msg: unknown) =>
  typeof msg === "string" && msg.includes("ResizeObserver loop");
window.addEventListener(
  "error",
  (e) => {
    if (isResizeObserverNoise(e.message)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  },
  true
);

const rootElement = document.getElementById("root");
if (rootElement) {
  // The static markup inside #root is an SEO/no-JS fallback, not a React
  // pre-render — clear it and mount fresh to avoid hydration mismatches.
  rootElement.innerHTML = "";
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
