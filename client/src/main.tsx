import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./input.css";
import { ThemeModeProvider } from "./providers/theme-provider.tsx";
import ReduxProvider from "./providers/ReduxProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider >
      <ThemeModeProvider>
      <App />
    </ThemeModeProvider >
    </ReduxProvider>
   
  </React.StrictMode>
);
