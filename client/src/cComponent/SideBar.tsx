import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  ArrowRight,
  ChevronRight,
  InboxIcon,
  Languages,
  LogInIcon,
  MailIcon,
  Menu,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ListSubheader, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useAuth from "../../hooks/useAuth";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserInfoProps } from "../context/AuthProvider";
import useLogout from "../../hooks/useLogout";

type Anchor = "top" | "left" | "bottom" | "right";

const SideBar = () => {
  const { auth } = useAuth();
const logout = useLogout();
  let decoded: UserInfoProps;
  if (auth.token) {
    decoded = jwtDecode<JwtPayload>(auth.token as string) as UserInfoProps;
  }
  const categories = useSelector((state: RootState) => state.category.category);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
        bgcolor: "background.black",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        variant="h5"
        className="text-center h-16 p-3 "
        sx={{ width: "100%", bgcolor: "background.paper" }}
      >
       <Link to={"/login"}> Hello,{decoded ? `${decoded.UserInfo.username}` :"Sign In"}</Link>
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>navigate("/allproducts")}>
            <ListItemIcon>
              <ShoppingBag />
            </ListItemIcon>
            <ListItemText primary="All Products" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListSubheader
          sx={{ bgcolor: "background.paper", color: "text.primary" }}
        >
          Shop by Department
        </ListSubheader>
        {categories.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => navigate(`/categories/${item.title}`)}
            >
              <ListItemText primary={item.title} />
              <ListItemIcon>
                <ChevronRight />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/allproducts")}>
            <ListItemText primary={"Help and Settings"} />
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/allproducts")}>
            <ListItemText primary={"Your Account"} />
            <ListItemIcon>
              <User />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/allproducts")}>
            <ListItemText primary={"Choose Language"} />
            <ListItemIcon>
              <Languages />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {auth?.token ? <ListItem disablePadding>
          <ListItemButton onClick={() =>logout()}>
            <ListItemText primary={"Sign Out"} />
            <ListItemIcon>
              <LogInIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem> : <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/login")}>
            <ListItemText primary={"Sign In"} />
            <ListItemIcon>
              <LogInIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem> }
       
      </List>
    </Box>
  );

  return (
    <>
      <Button
        onClick={toggleDrawer("left", true)}
        sx={{ color: "whitesmoke" }}
        className=" border-2"
      >
        <span
          className="p-2 gap-1 flex items-center justify-center text-sm  md:font-small
         hover:border-white hover:border-2  "
        >
          <Menu />
          All
        </span>
      </Button>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </>
  );
};

export default SideBar;
