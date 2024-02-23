import React, { useState } from "react";
import {
  ChevronDown,
  MenuIcon,
  SearchIcon,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  InputBase,
  Switch,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useTheme } from "../providers/theme-provider";
import { accountItems } from "./utils/items";
import useAuth from "../../hooks/useAuth";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserInfoProps } from "../context/AuthProvider";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TCartSchema } from "../components/pages/Orders";
import useLogout from "../../hooks/useLogout";
import Drawer from "@mui/material/Drawer";
import { instance } from "../../api/instance";
import { useQuery } from "@tanstack/react-query";
import Loading from "./reusable/Loading";

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),

    width: "0ch",
    "&:focus": {
      width: "5ch",
    },
    [theme.breakpoints.up("xs")]: {
      width: "0ch",
      "&:focus": {
        width: "8ch",
      },
    },
    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": {
        width: "20ch",
      },
    },
    [theme.breakpoints.up("md")]: {
      width: "0ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));
const fetchAllProducts = async () => {
  const response = await instance({
    url: "/products",
    method: "GET",
  });

  return response.data.products;
};

const MainNav = () => {
  const { auth } = useAuth();
  const signOut = useLogout();
  const cartItems = useSelector((state: RootState) => state.cart.carts);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { theme, toggleDarkMode } = useTheme();
  const [showDiv, setShowDiv] = useState<boolean>(false);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const decoded: UserInfoProps | undefined = auth.token
    ? (jwtDecode<JwtPayload>(auth.token as string) as UserInfoProps)
    : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isLoading, data, error, isError } = useQuery<any[]>({
    queryKey: ["all-products"],
    queryFn: fetchAllProducts,
    staleTime: 10000,
  });
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const searchProducts = data?.filter((product) =>
    searchQuery === ""
      ? product
      : product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(error);
  const drawer = (
    <Box
      className="flex flex-row gap-2 justify-center py-4 h-max"
      onClick={handleDrawerToggle}
      sx={{ width: "100vw", textAlign: "center", bgcolor: "#000202" }}
    >
      <div className="text-white">
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
    </Box>
  );
  const searchBox = isLoading ? (
    <Loading />
  ) : isError ? (
    <p>Error occured</p>
  ) : (
    <>
      {searchProducts?.length !== 0 ? (
        searchProducts?.slice(0, 4)?.map((item, index) => {
          return (
            <span
            onClick={()=>navigate(`/product/${item.id}`)}
              key={index}
              className="flex flex-row gap-3 cursor-pointer  border-2 border-gray-400 p-2"
            >
              <img
                src={item.image}
                alt={item.id}
                className="md:w-20 md:h-20 w-10 h-10 object-cover"
              />
              <Typography className="line-clamp-2 md:text-sm text-xs">
                {item.title}
              </Typography>
            </span>
          );
        })
      ) : (
        <Box
          sx={{ bgcolor: "background.main", color: "text.primary" }}
          className="flex items-center justify-center h-40 border-2 border-gray-400 rounded-md"
        >
          <Typography className="line-clamp-2 text-xs md:text-sm ">
            No search products found
          </Typography>
        </Box>
      )}
    </>
  );
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

      <div className="flex   flex-row items-center gap-2 md:gap-4">
        <div className="relative">
          <Search>
            <SearchIconWrapper>
              <SearchIcon className="cursor-pointer" />
            </SearchIconWrapper>
            <StyledInputBase
              onFocus={() => setShowSearchBox(true)}
              onBlur={()=>setTimeout(()=>setShowSearchBox(false),200)}
              placeholder="Search…"
              onChange={handleSearchInputChange}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {showSearchBox && (
            <Box
              sx={{ bgcolor: "background.main", color: "text.primary" }}
              className="absolute flex flex-col gap-2   top-12  md:-left-20 z-10 w-[200px] sm:w-[250px] md:w-[600px] h-max"
            >
              {searchBox}
            </Box>
          )}
        </div>
        <div className="md:hidden flex">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="top"
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: "block",
            }}
          >
            {drawer}
          </Drawer>
        </div>
        <div className="hidden md:flex flex-row items-center">
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
              {decoded
                ? `Hello,${decoded.UserInfo.username}`
                : "Hello, Sign In"}
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
                {auth.token && <Button
                  variant="contained"
                  onClick={() => signOut()}
                  className="my-1 text-xs font-medium"
                >
                  sign out
                </Button>}
              </div>
            </div>
          )}
        </div>
        <span className="flex flex-row p-0 md:p-2 items-center md:hover:border-2 hover:border-0">
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
