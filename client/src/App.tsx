import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Settings from "./components/pages/Settings";
import Customer from "./components/pages/Customer";
import Navbar from "./components/Navbar";
import { CssBaseline,ThemeProvider, createTheme } from "@mui/material";
import { purple, teal } from "@mui/material/colors";
import {  useTheme } from "./providers/theme-provider";



function App() {
  // State to manage the current theme mode
  const { theme } = useTheme();
  // Create custom theme based on the current mode
  const themeUi = createTheme({
    palette: {
      mode: theme==="dark" ? 'dark' : 'light',
      primary: theme==="dark" ? purple : teal, // Customize primary color based on theme
    },
  });

  return (
  
      <ThemeProvider theme={themeUi}>
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
  );
}

export default App;
