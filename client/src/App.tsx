import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import LoginPage from "./components/pages/auth/login";
import "react-toastify/dist/ReactToastify.css";
import Missing from "./components/Missing";
import Unauthorized from "./components/UnAuthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Dummy from "./components/pages/Dummy";
import MainNav from "./cComponent/MainNav";
import SubNavbar from "./cComponent/SubNavbar";
import HomePage from "./cComponent/pages/HomePage";
import AllProducts from "./cComponent/pages/AllProducts";

export interface RolesProps {
  [key: string]: number;
}

export const ROLES_LIST: RolesProps = {
  admin: 5150,
  customer: 2001,
};

function App() {
  const location = useLocation();
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
      <div className="w-full h-max">
        {location.pathname.startsWith("/admin") ? <Navbar/> :
        <><MainNav/><SubNavbar/></>
        }
        <Routes>
          <Route path="/">
            <Route index element={<HomePage/>}/>
            <Route path="allproducts" element={<AllProducts/>}/>
          </Route>
          <Route path="/admin">
            <Route element={<PersistLogin />}>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={[ROLES_LIST.admin, ROLES_LIST.customer]}
                  />
                }
              >
             
                  <Route index element={<Dashboard />} />
                  <Route path="products">
                    <Route index element={<Products />} />
                    <Route path="addproducts" element={<AddProducts />} />
                  </Route>
                  <Route path="customers">
                    <Route index element={<Customers />} />
                    <Route path="editcustomers" element={<EditCustomers />} />
                  </Route>
                  <Route path="orders">
                    <Route index element={<Order />} />
                    <Route path="editorders" element={<EditOrders />} />
                  </Route>

                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
            </Route>

            <Route path="login" element={<LoginPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Missing />} />
          {/* </Route> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
