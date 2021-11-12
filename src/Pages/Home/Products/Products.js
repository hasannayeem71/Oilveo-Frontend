import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

const Products = () => {
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
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        OILS
      </Typography>

      <Grid container spacing={2}>
        {products.slice(0, 6).map((product) => {
          return (
            <Grid item xs={12} md={4} key={product._id}>
              <Product product={product} />
            </Grid>
          );
        })}
      </Grid>
      <hr />
    </Container>
  );
};

export default Products;
