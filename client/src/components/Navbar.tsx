import {
  Button,
  ButtonProps,
  FormControlLabel,
  Popover,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../providers/theme-provider";
import { instance } from "../api/instance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { signOut } from "../store/userSlice";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { ROLES_LIST, RolesProps } from "../App";
import { purple } from "@mui/material/colors";
import { ArrowBigDown, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { theme, toggleDarkMode } = useTheme();
  const { pathname } = useLocation();

  const { auth } = useAuth();
  console.log(auth);
  const logout = useLogout();
  let decoded;
  if(auth.token){
   decoded=jwtDecode<JwtPayload>(auth.token as string) as any;

  }
  const valuesToFind =decoded?.UserInfo.roles;
const keys = [];

for (const key in ROLES_LIST) {
  if (Object.prototype.hasOwnProperty.call(ROLES_LIST, key)) {
    const value = ROLES_LIST[key];
    if (valuesToFind?.includes(value)) {
      keys.push(key);
    }
  }
}
  console.log(keys);

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
      <div className="flex h-16 items-center justify-between px-4 shadow-lg dark:bg-black dark:text-white">
        {pathname !== "/login" && (
          <nav className={"flex items-center space-x-4 lg:space-x-6 text-md"}>
            <Link
              to="/"
              className={`p-2 rounded-md transition-all  hover:text-primary
            ${
              pathname === "/"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
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
            ${
              pathname === "/orders"
                ? "font-semibold text-gray-600 bg-gray-300"
                : "text-muted-foreground"
            }
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
              onClick={() => logout()}
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
                fontWeight: '600',

                border: '2px solid #hhhgf',
                borderRadius: '8px',
                
              }}
            >
              <span className="capitalize flex flex-row gap-2">{decoded?.UserInfo.username}<ChevronDown /></span>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom', 
                horizontal: 'center', 
              }}
             
            >
             <div className="flex flex-col gap-2 p-2">
             <Typography sx={{  }}>Roles:</Typography>
              {keys?.map((key,i)=>{
                return(<span>
                  {i+1}.{" "}{key}
                </span>)
                
              })}

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
