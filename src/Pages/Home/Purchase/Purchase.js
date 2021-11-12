import {
  Alert,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Navigation from "../../Shared/Navigation/Navigation";

const typographyStyle = {
  textAlign: "left",
  fontWeight: "400",
};

const Purchase = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [orderData, setOrderData] = useState({});
  useEffect(() => {
    axios.get(`https://oilveo.herokuapp.com/oils/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);
  //handle all input field
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newOrderData = { ...orderData };
    newOrderData[field] = value;

    setOrderData(newOrderData);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  orderData.useName = user.displayName;
  orderData.email = user.email;
  orderData.productName = product.productName;
  orderData.id = id;
  orderData.status = "pending";
  orderData.productImg = product.productImg;
  orderData.productPrice = product.productPrice;
  //handle user information
  const handleSubmit = (e) => {
    axios.post(`https://oilveo.herokuapp.com/orders`, orderData).then((res) => {
      if (res.data.insertedId) {
        setOpen(true);
      }
    });
    e.preventDefault();
  };
  const {
    productName,
    productPrice,
    productDescription,
    productInStock,
    productImg,
  } = product;

  return (
    <>
      <Navigation />
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src={productImg} alt="" style={{ width: "90%" }} />
            <Typography style={typographyStyle} variant="h3">
              {productName}
            </Typography>
            <Typography as="h6" style={typographyStyle} variant="p">
              {productDescription}
            </Typography>

            <Typography
              as="p"
              style={typographyStyle}
              variant="p"
              sx={{ mt: 4 }}>
              STOCK : {productInStock}
            </Typography>
            <Typography style={typographyStyle} variant="h6" sx={{ mt: 4 }}>
              PRICE : ৳{productPrice}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ my: 2 }}>
              ORDER NOW
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ width: "75%", m: 1 }}
                label="Name"
                name="userName"
                required
                defaultValue={user.displayName}
                onBlur={handleOnBlur}
                type="text"
                variant="standard"
              />
              <TextField
                sx={{ width: "75%", m: 1 }}
                label="Email"
                required
                name="email"
                defaultValue={user.email}
                onBlur={handleOnBlur}
                type="email"
                variant="standard"
              />
              <TextField
                sx={{ width: "75%", m: 1 }}
                label="Phone"
                name="phone"
                required
                onBlur={handleOnBlur}
                type="number"
                variant="standard"
              />
              <TextField
                sx={{ width: "75%", m: 1 }}
                label="Address"
                name="address"
                required
                onBlur={handleOnBlur}
                type="address"
                variant="standard"
              />
              <TextField
                onBlur={handleOnBlur}
                label="Order Note(Optional)"
                name="note"
                variant="standard"
                multiline
                rows={3}
                sx={{ width: "75%" }}
                placeholder="Write your order note here"
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "75%", mt: 3 }}>
                ORDER NOW
              </Button>
            </form>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}>
            Order places successfully
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Purchase;
