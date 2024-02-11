import React from "react";
import { Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Cart from "./Cart";

const MainNav = () => {
  return (
    <div className="w-full h-full p-4 flex flex-row items-center justify-between  bg-blue-800 text-white">
      <div className="flex items-center" id="header-left">
        <Link
          to="/"
          className="flex flex-row items-center text-lg md:text-xl font-semibold tracking-wider text-gray-200"
        >
          Fake
          <span className="text-yellow-600">Store</span>
          <ShoppingBag className="text-2xl mx-1" />
        </Link>
      </div>
      <div className="relative flex flex-row w-60 md:w-96" id="header-center">
        <input
          type="text"
          placeholder="search for items"
          className="px-4 py-1 w-full text-sm focus:outline-none text-black rounded-l"
        />
        <button className="p-2 text-lg bg-yellow-600 text-black rounded-r ">
          <Search />
        </button>
      </div>{" "}
      <div id="header-right">
        <Cart />
      </div>
    </div>
  );
};

export default MainNav;
