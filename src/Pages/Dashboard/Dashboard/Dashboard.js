import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HomeIcon from "@mui/icons-material/Home";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import MenuIcon from "@mui/icons-material/Menu";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import PublishIcon from "@mui/icons-material/Publish";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import AddReview from "../../AddReview/AddReview";
import AdminRoute from "../../Login/AdminRoute/AdminRoute";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import ManageAllOrder from "../ManageAllOrder/ManageAllOrder";
import ManageProducts from "../ManageProducts/ManageProducts";
import MyOrders from "../MyOrders/MyOrders";
import Pay from "../Pay/Pay";
import UploadProducts from "../UploadProducts/UploadProducts";
const drawerWidth = 240;

const Dashboard = () => {
  const { admin, logOut } = useAuth();
  let { path, url } = useRouteMatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <Toolbar />
      <List>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        {admin && (
          <Link
            to={`${url}/manageAll`}
            style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <ManageSearchRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Manage all order" />
            </ListItem>
          </Link>
        )}
        {admin && (
          <Link
            to={`${url}/upload`}
            style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <PublishIcon />
              </ListItemIcon>
              <ListItemText primary="Add product" />
            </ListItem>
          </Link>
        )}
        {admin && (
          <Link
            to={`${url}/manageProducts`}
            style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <AutorenewRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Manage products" />
            </ListItem>
          </Link>
        )}
        {admin && (
          <Link
            to={`${url}/makeAdmin`}
            style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Make admin" />
            </ListItem>
          </Link>
        )}
        {!admin && (
          <Link
            to={`${url}/myOrder`}
            style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <FavoriteBorderRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="My order" />
            </ListItem>
          </Link>
        )}
        {!admin && (
          <Link
            to={`${url}/pay`}
            style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <PaymentRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Pay" />
            </ListItem>
          </Link>
        )}
        {!admin && (
          <Link
            to={`${url}/review`}
            style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <ReviewsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Review" />
            </ListItem>
          </Link>
        )}

        <ListItem button onClick={logOut}>
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" noWrap component="div">
              DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}>
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open>
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}>
          <Toolbar />
          <Switch>
            <Route exact path={path}>
              <h3>Welcome to dashboard</h3>
            </Route>

            <AdminRoute path={`${path}/upload`}>
              <UploadProducts />
            </AdminRoute>
            <AdminRoute path={`${path}/manageAll`}>
              <ManageAllOrder />
            </AdminRoute>
            <AdminRoute path={`${path}/makeAdmin`}>
              <MakeAdmin />
            </AdminRoute>
            <AdminRoute path={`${path}/manageProducts`}>
              <ManageProducts />
            </AdminRoute>
            {/* normal user see on dashboard */}
            <Route path={`${path}/pay`}>
              <Pay />
            </Route>
            <Route path={`${path}/myOrder`}>
              <MyOrders />
            </Route>
            <Route path={`${path}/review`}>
              <AddReview />
            </Route>
          </Switch>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
