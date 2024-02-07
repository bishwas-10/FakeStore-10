import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./input.css";
import { ThemeModeProvider } from "./providers/theme-provider.tsx";
import ReduxProvider from "./providers/ReduxProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ReduxProvider>
        <ThemeModeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeModeProvider>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>
);
