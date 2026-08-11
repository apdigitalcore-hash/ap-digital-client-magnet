import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

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
