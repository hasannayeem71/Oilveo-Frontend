import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { productName, productPrice, productDescription, productImg, _id } =
    product;
  //
  return (
    <Box style={{ backgroundColor: "white" }}>
      <img
        src={productImg}
        alt=""
        style={{ width: "75%", backgroundColor: "red" }}
      />
      <br />
      <Typography sx={{ px: 3 }} variant="h6">
        {productName}
      </Typography>
      <Typography sx={{ px: 3 }} variant="small">
        {productDescription.slice(0, 60)}..
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-around", pb: 3 }}>
        <Typography variant="h6">৳{productPrice}</Typography>
        <Link to={`/purchase/${_id}`} style={{ textDecoration: "none" }}>
          <Button variant="outlined" size="small">
            PURCHASE
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Product;
