import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import MyOrder from "../MyOrder/MyOrder";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };
  useEffect(() => {
    const email = user?.email;

    if (email) {
      axios
        .get(`https://oilveo.herokuapp.com/orders/find?email=${email}`)
        .then((res) => {
          setOrders(res.data);

          setLoading(false);
        });
    }
  }, [user.email]);
  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else if (orders.length === 0) {
    return (
      <>
        <h4>YOU HAVE NO ORDER</h4>
      </>
    );
  }
  return (
    <div>
      <Grid container spacing={2}>
        {orders.map((myOrder) => (
          <Grid item xs={6} md={4} lg={4} key={myOrder._id}>
            <MyOrder
              myOrder={myOrder}
              orders={orders}
              setMessage={setMessage}
              setOrders={setOrders}
              setSuccess={setSuccess}
            />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleMessageClose}>
        <Alert
          onClose={handleMessageClose}
          severity="success"
          sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MyOrders;
