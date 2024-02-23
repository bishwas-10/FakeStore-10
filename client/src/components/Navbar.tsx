import {
  Button,
  FormControlLabel,
  Popover,
  Switch,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../providers/theme-provider";

import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { ROLES_LIST } from "../App";

import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const { theme, toggleDarkMode } = useTheme();
  const { pathname } = useLocation();

  const { auth } = useAuth();

  const logout = useLogout();
  let decoded;
  if (auth.token) {
    decoded = jwtDecode<JwtPayload>(auth.token as string) as any;
  }
  const valuesToFind = decoded?.UserInfo.roles;
  const keys = [];

  for (const key in ROLES_LIST) {
    if (Object.prototype.hasOwnProperty.call(ROLES_LIST, key)) {
      const value = ROLES_LIST[key];
      if (valuesToFind?.includes(value)) {
        keys.push(key);
      }
    }
  }

  //mui
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="border-b p-2 ">
      <div className="flex h-16 items-center justify-between px-4 shadow-lg ">
        {pathname !== "/login" && (
          <nav className={"flex items-center space-x-4 lg:space-x-6 text-md"}>
            <Link
              to="/admin"
              className={`p-2 rounded-md transition-all 
            ${
              pathname === "/admin"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            `}
            >
              Overview
            </Link>
            <Link
              to="/admin/products"
              className={`p-2  
            ${
              pathname === "/admin/products"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all `}
            >
              Products
            </Link>
            <Link
              to="/admin/categories"
              className={`p-2  
            ${
              pathname === "/admin/categories"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all `}
            >
              Categories
            </Link>
            <Link
              to="/admin/customers"
              className={`p-2 
            ${
              pathname === "/admin/customers"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all `}
            >
              Customers
            </Link>
            <Link
              to="/admin/orders"
              className={`p-2 
            ${
              pathname === "/admin/orders"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all `}
            >
              Orders
            </Link>
            <Link
              to="/admin/settings"
              className={` p-2 
            ${
              pathname === "/admin/settings"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
            rounded-md transition-all `}
            >
              Settings
            </Link>

            <Button
              variant="contained"
              onClick={() => logout()}
              className={`p-2   rounded-md `}
            >
              logout
            </Button>
          </nav>
        )}

        <div className="flex flex-row gap-4 ">
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
          <div className="flex  items-center justify-center">
            <Button
              aria-describedby={id}
              variant="outlined"
              onClick={handleClick}
              size="medium"
              sx={{
                fontWeight: "600",

                border: "2px solid #hhhgf",
                borderRadius: "8px",
              }}
            >
              <span className="capitalize flex flex-row gap-2">
                {decoded?.UserInfo.username}
                <ChevronDown />
              </span>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <div className="flex flex-col gap-2 p-2">
                <Typography sx={{}}>Roles:</Typography>
                {keys?.map((key, i) => {
                  return (
                    <span key={i}>
                      {i + 1}. {key}
                    </span>
                  );
                })}
                <Button
                  variant="contained"
                  onClick={() => logout()}
                  className={`p-2 rounded-md `}
                >
                  logout
                </Button>
                <Button variant="outlined">User Profile</Button>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
