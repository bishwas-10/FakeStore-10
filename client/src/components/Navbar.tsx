import { FormControlLabel, Switch } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../providers/theme-provider";
import { instance } from "../api/instance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { signOut } from "../store/userSlice";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { theme, toggleDarkMode } = useTheme();
  const { pathname } = useLocation();
 
const {auth}= useAuth();
const logout = useLogout();


  return (
    <div className="border-b p-2 ">
      <div className="flex h-16 items-center justify-between px-4 shadow-lg dark:bg-black dark:text-white">
        
        {pathname!=="/login" &&  
          <nav className={"flex items-center space-x-4 lg:space-x-6 text-md"}>
          <Link
            to="/"
            className={`p-2 rounded-md transition-all  hover:text-primary
            ${pathname === "/" ? "font-semibold text-gray-600 bg-gray-300" : "text-muted-foreground"}
            `}
          >
            Overview
          </Link>
          <Link
            to="/products"
            className={`p-2  
            ${
              pathname === "/products" 
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all hover:text-primary`}
          >
            Products
          </Link>{" "}
          <Link
            to="/customers"
            className={`p-2 
            ${
              pathname === "/customers"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all hover:text-primary`}
          >
            Customers
          </Link>
          <Link
            to="/orders"
            className={`p-2 
            ${pathname === "/orders" ? "font-semibold text-gray-600 bg-gray-300" : "text-muted-foreground"}
            rounded-md transition-all hover:text-primary`}
          >
            Orders
          </Link>
          <Link
            to="/settings"
            className={` p-2 
            ${
              pathname === "/settings"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all hover:text-primary`}
          >
            Settings
          </Link>
          <Link
            to="/login"
            className={`p-2 
            ${
              pathname === "/login"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all hover:text-primary`}
          >
            Login
          </Link>
          <button
           onClick={()=>logout()} 
            className={`p-2 
            ${
              pathname === "/login"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all hover:text-primary`}
          >
            logout
          </button>
        </nav>}
     
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={theme === "dark"}
                onChange={() =>
                  toggleDarkMode(theme === "dark" ? "light" : "dark")
                }
              />
            }
            label="Dark Mode"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
