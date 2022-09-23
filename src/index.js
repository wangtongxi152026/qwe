import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import A from "./A";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <A />
  </StrictMode>
);
