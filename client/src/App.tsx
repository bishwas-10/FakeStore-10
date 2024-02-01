import  { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Settings from "./components/pages/Settings";
import Customer from "./components/pages/Customer";
import Navbar from "./components/Navbar";
import { CssBaseline,ThemeProvider, createTheme } from "@mui/material";
import { purple, teal } from "@mui/material/colors";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

function App() {
  // State to manage the current theme mode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Function to toggle between dark and light themes
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  // Create custom theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: darkMode ? purple : teal, // Customize primary color based on theme
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div>
         
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/customers" element={<Customer />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
