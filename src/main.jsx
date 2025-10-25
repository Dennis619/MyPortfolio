import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./Component/Context/SnackbarContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/MyPortfolio">
    <StrictMode>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </StrictMode>
  </BrowserRouter>
);
