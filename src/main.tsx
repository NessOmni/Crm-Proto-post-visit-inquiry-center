import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/layout.css";
import "./styles/flow1.css";
import "./styles/flow2.css";
import "./styles/contacts.css";
import "./styles/voice.css";
import "./styles/polish.css";
import { DemoProvider } from "./state/DemoContext";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DemoProvider>
      <App />
    </DemoProvider>
  </StrictMode>,
);
