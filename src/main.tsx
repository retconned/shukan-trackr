import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HabitTracker from "./components/HabitTracker.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HabitTracker />
  </StrictMode>
);
