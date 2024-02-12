import React, { useState } from "react";
import { ChevronDown, Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { FormControlLabel, Switch } from "@mui/material";
import { useTheme } from "../providers/theme-provider";
import { accountItems } from "./utils/items";
import useAuth from "../../hooks/useAuth";

const MainNav = () => {
  const {auth} = useAuth();
  const { theme, toggleDarkMode } = useTheme();
  const [showDiv, setShowDiv] = useState<boolean>(false);
  return (
    <div className="w-full h-full p-4 flex flex-row items-center justify-between bg-slate-700 text-white">
      <div className="flex items-center">
        <Link
          to="/"
          className="flex flex-row items-center text-lg md:text-xl font-semibold tracking-wider text-gray-200"
        >
          Fake
          <span className="text-yellow-500">Store</span>
          <ShoppingBag className="text-2xl mx-1" />
        </Link>
      </div>
      <div className="relative flex flex-row w-60 md:w-96">
        <input
          type="text"
          placeholder="search for items"
          className="px-4 py-1 w-full text-sm focus:outline-none text-black rounded-l"
        />
        <button className="p-2 text-lg bg-yellow-500 text-black rounded-r ">
          <Search />
        </button>
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
        <Link
          to="/login"
          onMouseEnter={() => setShowDiv(true)}
          onFocus={() => setShowDiv(true)}
          onBlur={() => setShowDiv(false)}
          onMouseLeave={() => setShowDiv(false)}
          className="flex flex-col items-start hover:border-2 cursor-pointer p-2"
        >
          <span className="text-xs">Hello, sign in</span>
          <span className={`text-sm font-bold flex flex-row items-center`}>
            Accounts and Lists
            <ChevronDown height={16} />
          </span>
        </Link>
        {showDiv && (
          <div
            onMouseEnter={() => setShowDiv(true)}
            onMouseLeave={() => setShowDiv(false)}
            className="z-10 w-[20%] h-max flex flex-col absolute top-[72px] right-20 bg-white dark:bg-gray-700  shadow-md p-4"
          >
            <div className="w-full flex flex-col items-center gap-2 font-sans tracking-normal">
              <Link
                to=""
                className="w-[60%] bg-yellow-500 text-center text-md py-2"
              >
                Sign In
              </Link>
              <span className="text-xs font-medium">
                New customer? <span className="text-blue-500">Start here</span>
              </span>
            </div>
            <div className="w-full flex flex-col items-start mt-2">
              <h1 className="text-center text-lg font-bold w-full">
                Your Account
              </h1>

              {accountItems.map((item, index) => {
                return (
                  <Link
                    className="my-1 text-xs font-medium hover:text-red-500 hover:border-b-2 transition-all hover:border-b-red-500"
                    to={item.to}
                    key={index}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        <span className="flex flex-row  items-center">
          <Cart />
        </span>
      </div>
    </div>
  );
};

export default MainNav;
