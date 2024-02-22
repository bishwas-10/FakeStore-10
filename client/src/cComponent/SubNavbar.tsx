import React from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import useLogout from "../../hooks/useLogout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { MenuIcon } from "lucide-react";
const SubNavbar = () => {
  const logout = useLogout();
  const { auth } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      className="flex flex-row gap-2 justify-center text-white bg-slate-800 py-4 h-max"
      onClick={handleDrawerToggle}
      sx={{ width: "100vw", textAlign: "center" }}
    >
      <List>
        {["Today's Deal", "Customer Service", "Sell", " Gift Cards"].map(
          (text, index) => (
            <ListItem key={index} disablePadding sx={{width:"100%",padding:"2px",cursor:"pointer"}}>
          
              <ListItemText primary={text} />
            
            
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
  const logOut = () => {
    logout().then(() =>
      toast.success("Sign Out successfully", {
        position: "top-center",
        autoClose: 2000,
      })
    );
  };
  return (
    <div className=" relative flex items-center p-2 w-full h-12 bg-slate-800 text-white">
      <div className="w-full flex flex-row  items-center md:justify-start justify-between">
        <Box>
          <SideBar />
          <Link
            to="/admin"
            className="px-3 py-2  md:font-small hover:border-white hover:border-2 transition-all  "
          >
            Admin
          </Link>
        </Box>

        <Box className="hidden md:flex flex-row items-center">
          {["Today's Deal", "Customer Service", "Sell", " Gift Cards"].map(
            (text, index) => (
              <Link
                key={index}
                to="#"
                className="px-3 py-2  md:font-small hover:border-white hover:border-2 transition-all duration-75"
              >
                {text}
              </Link>
            )
          )}
        </Box>

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
           {auth.token && (
          <button onClick={logOut} className="p-2">
            logout
          </button>
        )}
        </div>
      
      </div>
      <ToastContainer />
    </div>
  );
};

export default SubNavbar;
