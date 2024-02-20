import React, { useState } from "react";
import { ChevronDown, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { useTheme } from "../providers/theme-provider";
import { accountItems } from "./utils/items";
import useAuth from "../../hooks/useAuth";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserInfoProps } from "../context/AuthProvider";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TCartSchema } from "../components/pages/Orders";
import useLogout from "../../hooks/useLogout";

const MainNav = () => {
  const { auth } = useAuth();
  const signOut = useLogout();
  const cartItems = useSelector((state: RootState) => state.cart.carts);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleDarkMode } = useTheme();
  const [showDiv, setShowDiv] = useState<boolean>(false);

  const decoded: UserInfoProps | undefined = auth.token
    ? (jwtDecode<JwtPayload>(auth.token as string) as UserInfoProps)
    : undefined;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        paddingX: 3,
        paddingY: 2,
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#000202",
        color: "#fff",
      }}
      className=" flex flex-row"
    >
      <div className="flex items-center">
        <Link
          to="/"
          className="flex flex-row items-center text-lg md:text-xl font-semibold tracking-wider "
        >
          Fake
          <span className="text-yellow-500">Store</span>
          <ShoppingBag className="text-2xl mx-1" />
        </Link>
      </div>
      <div className="relative flex flex-row w-60 shadow-md md:w-96">
        <input
          type="text"
          placeholder="search for items"
          className="px-4 py-1 w-full text-sm focus:outline-none text-black  rounded-l"
        />
        <Button variant="contained" className="p-2 text-lg  ">
          <Search />
        </Button>
      </div>

      <div className="flex flex-row gap-2 items-center">
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
            label={"Dark Mode"}
          />
        </div>
        <Button
          onClick={() =>
            navigate("/login", { state: { from: location }, replace: true })
          }
          onMouseEnter={() => setShowDiv(true)}
          onFocus={() => setShowDiv(true)}
          onBlur={() => setShowDiv(false)}
          onMouseLeave={() => setShowDiv(false)}
          variant="contained"
          className="flex flex-col items-start hover:border-2 cursor-pointer p-2"
        >
          <span className="text-xs">
            {decoded ? `Hello,${decoded.UserInfo.username}` : "Hello, Sign In"}
          </span>
          <span className={`text-sm font-bold flex flex-row items-center`}>
            Accounts and Lists
            <ChevronDown height={16} />
          </span>
        </Button>
        {showDiv && (
          <div
            onMouseEnter={() => setShowDiv(true)}
            onMouseLeave={() => setShowDiv(false)}
            className="z-10 w-[20%] h-max flex flex-col absolute top-[60px] right-20 bg-white dark:bg-gray-700  shadow-md p-4"
          >
            <div className="w-full flex flex-col items-center gap-2 font-sans tracking-normal">
              <Button
                onClick={() =>
                  navigate("/login", {
                    state: { from: location },
                    replace: true,
                  })
                }
                variant="contained"
                className="w-[60%]  text-center text-md py-2"
              >
                {auth.token
                  ? `Hello,${decoded?.UserInfo.username}`
                  : "Hello, Sign In"}
              </Button>
              {!auth.token && (
                <span className="text-xs font-medium">
                  New customer
                  <Link to={"/signup"} className="text-blue-500">
                    Start here
                  </Link>
                </span>
              )}
            </div>
            <div className="w-full flex flex-col items-start mt-2">
              <h1 className="text-center text-lg font-bold w-full">
                Your Account
              </h1>

              {accountItems.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    
                    <Link
                      className="my-1 text-xs font-medium hover:text-red-500
                       hover:border-b-2 transition-all hover:border-b-red-500"
                      to={item.to}
                     
                    >
                      {item.name}
                    </Link>
                   
                  </React.Fragment>
                );
              })}
               <Button
                    variant="contained"
                    onClick={()=>signOut()}
                      className="my-1 text-xs font-medium"
                      
                    >
                      sign out
                    </Button>
            </div>
          </div>
        )}
        <span className="flex flex-row  items-center hover:border-2 p-2">
          <Link
            to={`/carts/${decoded?.UserInfo.userId}`}
            className="flex relative"
          >
            <ShoppingCart height={30} width={30} />
            <span
              className="absolute -top-2 -right-1 -translate-x-1/2 
            text-center text-sm text-primary"
            >
              {cartItems
                ?.map((item: TCartSchema) =>
                  item.paymentStatus === "not paid"
                    ? parseInt(item.quantity)
                    : 0
                )
                .reduce((acc, curr) => acc + curr, 0)}
            </span>
          </Link>
        </span>
      </div>
    </Box>
  );
};

export default MainNav;
