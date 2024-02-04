import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Settings from "./components/pages/Settings";
import Navbar from "./components/Navbar";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { purple, teal } from "@mui/material/colors";
import { useTheme } from "./providers/theme-provider";
import Order from "./components/pages/Orders";
import Customers from "./components/pages/Customers";
import AddProducts from "./components/pages/sub-components/add-products";
import EditCustomers from "./components/pages/sub-components/editCustomers";
import EditOrders from "./components/pages/sub-components/editOrders";

function App() {
  // State to manage the current theme mode
  const { theme } = useTheme();
  // Create custom theme based on the current mode
  const themeUi = createTheme({
    palette: {
      mode: theme === "dark" ? "dark" : "light",
      primary: theme === "dark" ? purple : teal, // Customize primary color based on theme
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
            <Route path="/products">
              <Route index element={<Products />} />
              <Route path="addproducts" element={<AddProducts />} />
            </Route>
            <Route path="/customers">
              <Route index element={<Customers />} />
              <Route path="editcustomers" element={<EditCustomers />} />
            </Route>
            <Route path="/orders">
              <Route index element={<Order />} />
              <Route path="editorders" element={<EditOrders />} />
            </Route>
          
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
