import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  if (rootElement.hasChildNodes()) {
    // Hydrate pre-rendered HTML (react-snap / bots)
    hydrateRoot(
      rootElement,
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}