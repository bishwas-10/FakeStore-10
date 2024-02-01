import { FormControlLabel, Switch } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTheme } from "../providers/theme-provider";

const Navbar = () => {
  const { theme, toggleDarkMode } = useTheme();
  const { pathname } = useLocation();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4 shadow-lg dark:bg-black dark:text-white">
        <nav className={"flex items-center space-x-4 lg:space-x-6 "}>
          <a
            href="/"
            className={`text-sm   transition-colors hover:text-primary
            ${pathname === "/" ? "font-medium" : "text-muted-foreground"}
            `}
          >
            Overview
          </a>
          <a
            href="/products"
            className={`text-sm 
            ${
              pathname === "/products"
                ? "font-medium "
                : "text-muted-foreground"
            }
            transition-colors hover:text-primary`}
          >
            Products
          </a>{" "}
          <a
            href="/customers"
            className={`text-sm 
            ${
              pathname === "/customers"
                ? "font-medium "
                : "text-muted-foreground"
            }
            transition-colors hover:text-primary`}
          >
            Customers
          </a>
          <a
            href="/orders"
            className={`text-sm 
            ${pathname === "/orders" ? "font-medium " : "text-muted-foreground"}
            transition-colors hover:text-primary`}
          >
            Orders
          </a>
          <a
            href="/settings"
            className={`text-sm 
            ${
              pathname === "/settings"
                ? "font-medium "
                : "text-muted-foreground"
            }
            transition-colors hover:text-primary`}
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
