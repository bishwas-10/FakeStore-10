import { FormControlLabel, Switch } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTheme } from "../providers/theme-provider";

const Navbar = () => {
  const { theme, toggleDarkMode } = useTheme();
  const { pathname } = useLocation();

  return (
    <div className="border-b p-2 ">
      <div className="flex h-16 items-center justify-between px-4 shadow-lg dark:bg-black dark:text-white">
        <nav className={"flex items-center space-x-4 lg:space-x-6 text-md"}>
          <a
            href="/"
            className={`p-2 rounded-md transition-all  hover:text-primary
            ${pathname === "/" ? "font-semibold text-gray-600 bg-gray-300" : "text-muted-foreground"}
            `}
          >
            Overview
          </a>
          <a
            href="/products"
            className={`p-2  
            ${
              pathname === "/products" 
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all hover:text-primary`}
          >
            Products
          </a>{" "}
          <a
            href="/customers"
            className={`p-2 
            ${
              pathname === "/customers"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all hover:text-primary`}
          >
            Customers
          </a>
          <a
            href="/orders"
            className={`p-2 
            ${pathname === "/orders" ? "font-semibold text-gray-600 bg-gray-300" : "text-muted-foreground"}
            rounded-md transition-all hover:text-primary`}
          >
            Orders
          </a>
          <a
            href="/settings"
            className={` p-2 
            ${
              pathname === "/settings"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all hover:text-primary`}
          >
            Settings
          </a>
        </nav>
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
