import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuIcon from "@mui/icons-material/Menu";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/logo.png";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Navigation = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { user, logOut } = useAuth();
  const history = useHistory();

  // const [open, setOpen] = React.useState(false);

  return (
    <div style={{ color: "black" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link
            to="/allProducts"
            style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <TravelExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItem>
          </Link>

          {user && (
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "black" }}>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
          )}
          {user ? (
            <ListItem button onClick={logOut}>
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}>
              <ListItem button>
                <ListItemIcon>
                  <LoginRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
          )}
        </List>
      </Drawer>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar variant="">
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon style={{ color: "black" }} />
          </IconButton>

          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                color: "black",
                margin: "0px 5px",
              }}>
              HOME
            </Link>
            <Link
              to="/allProducts"
              style={{
                textDecoration: "none",
                color: "black",
                margin: "0px 5px",
              }}>
              EXPLORE
            </Link>
            {user && (
              <Link
                to="/dashboard"
                style={{
                  textDecoration: "none",
                  color: "black",
                  margin: "0px 5px",
                }}>
                DASHBOARD
              </Link>
            )}

            {user ? (
              <>
                {" "}
                <Button style={{ color: "black" }} onClick={logOut}>
                  LOGOUT
                </Button>
                <small style={{ color: "black" }}>{user.displayName}</small>
              </>
            ) : (
              <Button
                style={{ color: "black" }}
                onClick={() => history.push("/login")}>
                LOGIN
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
