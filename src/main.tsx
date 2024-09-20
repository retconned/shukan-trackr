import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import App from "@/App.tsx";

import { setupOfflineHandler } from "./offline";

setupOfflineHandler();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={"dark"} storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
