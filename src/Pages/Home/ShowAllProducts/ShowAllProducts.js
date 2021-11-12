import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";
import Product from "../Product/Product";

const ShowAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://oilveo.herokuapp.com/oils`)
      .then((res) => setProducts(res.data));
  }, []);
  if (products.length === 0) {
    return <CircularProgress />;
  }
  return (
    <>
      <Navigation />
      <Container sx={{ my: 4 }}>
        <Typography variant="h4">ALL HAIR OILS</Typography>
        <Grid container spacing={2}>
          {products.map((product) => {
            return (
              <Grid item xs={12} md={4} key={product._id}>
                <Product product={product} />
              </Grid>
            );
          })}
        </Grid>
        <hr />
      </Container>
      <Footer />
    </>
  );
};

export default ShowAllProducts;
