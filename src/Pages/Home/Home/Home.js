import { Button } from "@mui/material";
import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import UploadProducts from "../../Admin/UploadProducts/UploadProducts";
import Navigation from "../../Shared/Navigation/Navigation";
import Products from "../Products/Products";
import ShowAllProducts from "../ShowAllProducts/ShowAllProducts";
const Home = () => {
  let { path, url } = useRouteMatch();
  console.log(path, url);
  return (
    <Navigation>
      <Link to={url}>
        <Button color="inherit">show all</Button>
      </Link>
      <Link to={`${url}/dashboard`}>
        <Button color="inherit">Dashboard</Button>
      </Link>
      <Products />
      <Switch>
        <Route path={`${path}/dashboard`}>
          <UploadProducts />
        </Route>
        <Route exact path={path}>
          <ShowAllProducts />
        </Route>
      </Switch>
    </Navigation>
  );
};

export default Home;
