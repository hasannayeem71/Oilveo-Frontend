import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/logo.png";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Navigation = ({ children }) => {
  const { user, logOut } = useAuth();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open} style={{ background: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              color: "black",
              ...(open && { display: "none" }),
            }}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <img src={logo} alt="" />
            <Button
              variant="text"
              sx={{ mx: 4 }}
              onClick={() => history.replace("/")}>
              Home
            </Button>
            <Button
              variant="text"
              sx={{ mx: 4 }}
              onClick={() => history.replace("/allProducts")}>
              All Products
            </Button>
            <Button variant="text" sx={{ mx: 4 }}>
              About
            </Button>
            {user ? (
              <Button variant="contained" sx={{ mx: 4 }} onClick={logOut}>
                LOGOUT
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ mx: 4 }}
                onClick={() => history.replace("/login")}>
                LOGIN
              </Button>
            )}
            {user && (
              <Typography variant="p" sx={{ color: "black" }}>
                {user.displayName}
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </List>

        <List>
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <ListItemText />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Navigation;
