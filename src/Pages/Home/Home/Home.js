import React from "react";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";
import Banner from "../Banner/Banner";
import BeautyAdvice from "../BeautyAdvice/BeautyAdvice";
import Products from "../Products/Products";
import UserReviews from "../UserReviews/UserReviews";

const Home = () => {
  return (
    <>
      <Navigation />
      <Banner />
      <Products />
      <UserReviews />
      <BeautyAdvice />

      <Footer />
    </>
  );
};

export default Home;

/**import { useRouteMatch } from "react-router-dom";
 

let { path, url } = useRouteMatch();

*/

/*<Link to={`${url}/dashboard`}>
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
      </Switch>*/
