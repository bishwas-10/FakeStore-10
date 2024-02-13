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
import { useNavigate } from "react-router-dom";
import { ListSubheader } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Anchor = "top" | "left" | "bottom" | "right";

const SideBar = () => {
  const categories = useSelector((state:RootState)=>state.category.category)
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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {categories.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Shop by Department</ListSubheader>
        {categories.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(`/categories/${item.title}`)}>
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
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/allproducts")}>
            <ListItemText primary={"Sign In"} />
            <ListItemIcon>
              <LogInIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer("left", true)}
       sx={{ color: "whitesmoke" }} className=" border-2">
      <span
        className="p-2 gap-1 flex items-center justify-center text-sm  md:font-small
         hover:border-white hover:border-2  "
      >
       <Menu/>All
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
