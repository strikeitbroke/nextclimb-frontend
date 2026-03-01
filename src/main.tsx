import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";
import "flowbite";
import "./index.css";
import App from "./App.tsx";

if (import.meta.env.PROD) {
  ReactGA.initialize("G-EZYNVSP8VB");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
