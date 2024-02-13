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
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ListSubheader } from "@mui/material";

type Anchor = "top" | "left" | "bottom" | "right";

const SideBar = () => {
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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Shop by Department</ListSubheader>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate("/allproducts")}>
              <ListItemText primary={text} />
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
    <div>
      <Button onClick={toggleDrawer("left", true)} sx={{ color: "whitesmoke" }}>
        sgdg
      </Button>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};

export default SideBar;
