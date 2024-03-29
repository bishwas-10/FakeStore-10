import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Settings from "./components/pages/Settings";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";
import { indigo, amber, grey } from "@mui/material/colors";

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
import MainNav from "./cComponent/MainNav";
import SubNavbar from "./cComponent/SubNavbar";
import HomePage from "./cComponent/pages/HomePage";
import AllProducts from "./cComponent/pages/AllProducts";
import EachProduct from "./cComponent/pages/EachProduct";
import EachCategoryProduct from "./cComponent/pages/EachCategoryProduct";
import { useTheme } from "./providers/theme-provider";
import SignUpPage from "./components/pages/auth/signup";
import Footer from "./cComponent/Footer";
import Categories from "./components/pages/Categories";
import AddCategory from "./components/pages/sub-components/AddCategory";
import CartPage from "./cComponent/pages/CartPage";
import CheckOutPage from "./cComponent/pages/CheckOutPage";
import StripeCheckOut from "./cComponent/pages/StripeCheckOut";
import BackToTop from "./cComponent/reusable/BackToTop";
import ScrollToTop from "./cComponent/ScrollToTop";
import OrderSuccess from "./cComponent/pages/OrderSuccess";
import DesktopCheck from "./components/pages/DesktopCheck";

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
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? amber[500] : indigo[500],
      },
      background:
        mode === "dark"
          ? {
              main: grey[800],
              black: "#000202",
              default: grey[900],
              paper: grey[800],
            }
          : {
              main: grey[100],
              black: "#ffffff",
              default: grey[100],
              paper: grey[300],
            },
      text:
        mode === "light"
          ? {
              primary: grey[900],
              secondary: grey[800],
              textSecondary: indigo[500],
            }
          : {
              primary: "#fff",
              secondary: grey[500],
              textSecondary: amber[500],
            },
    },
  });

  const themeUi = createTheme(getDesignTokens(theme));

  return (
    <ThemeProvider theme={themeUi}>
      <CssBaseline />
      <div className="w-full h-max ">
        <ScrollToTop>
          {location.pathname.startsWith("/admin") ? (
            <Navbar />
          ) : (
            <>
              <MainNav />
              <SubNavbar />
            </>
          )}

          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="order-success" element={<OrderSuccess />} />
              <Route path="allproducts" element={<AllProducts />} />
              <Route path="product/:id" element={<EachProduct />} />
              <Route
                path="categories/:category"
                element={<EachCategoryProduct />}
              />
              <Route element={<PersistLogin />}>
               
                  {" "}
                  <Route path="carts/:userId">
                    <Route index element={<CartPage />} />
                    <Route
                      path="checkout"
                      element={
                        <RequireAuth allowedRoles={[ROLES_LIST.customer]} />
                      }
                    >
                      <Route index element={<CheckOutPage />} />
                      <Route path="stripe" element={<StripeCheckOut />} />
                    </Route>
                
                </Route>
              </Route>
            </Route>
            <Route path="/admin">
              <Route element={<PersistLogin />}>
                <Route
                  element={<RequireAuth allowedRoles={[ROLES_LIST.admin]} />}
                >
                  <Route element={<DesktopCheck />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products">
                      <Route index element={<Products />} />
                      <Route path="addproducts" element={<AddProducts />} />
                    </Route>
                    <Route path="categories">
                      <Route index element={<Categories />} />
                      <Route path="addcategory" element={<AddCategory />} />
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
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Missing />} />
            {/* </Route> */}
          </Routes>
          <BackToTop />
          <Footer />
        </ScrollToTop>
      </div>
    </ThemeProvider>
  );
}

export default App;
