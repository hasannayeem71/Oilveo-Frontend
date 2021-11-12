import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ManageAllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [id, setId] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [success, setSuccess] = useState(false);
  const [orderDelete, setorderDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };
  useEffect(() => {
    axios.get(`https://oilveo.herokuapp.com/orders`).then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = () => {
    axios.delete(`https://oilveo.herokuapp.com/order/${id}`).then((res) => {
      if (res.data.acknowledged) {
        const reminding = orders.filter((order) => order._id !== id);
        setOrders(reminding);
      }
      setSuccess(true);
      setMessage("Order Deleted Successfully");
    });
  };

  const handleUpdate = () => {
    const status = {
      status: "Shipped",
      id: id,
    };
    axios
      .put(`https://oilveo.herokuapp.com/order/status`, status)
      .then((res) => {
        if (res.data.acknowledged) {
          const updatedOrder = orders.find((order) => order._id === id);
          orders.pop(updatedOrder);
          updatedOrder.status = "Approved";
          const newOrder = [...orders, updatedOrder];
          setOrders(newOrder);
          setId("");
          setSuccess(true);
          setMessage("Order updated successfully");
        }
      });
  };
  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <>
      <Paper sx={{ width: "100%", overflowX: "scroll" }}>
        <TableContainer sx={{ maxHeight: "85%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Product name</TableCell>
                <TableCell>Product price</TableCell>
                <TableCell>User name</TableCell>
                <TableCell>User email</TableCell>
                <TableCell>Order status</TableCell>
                <TableCell>Update status</TableCell>
                <TableCell>Delete order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                return (
                  <TableRow hover role="checkbox" key={order._id}>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell>{order.productPrice}</TableCell>
                    <TableCell>{order.useName}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell
                      sx={{ color: "green" }}
                      onClick={() => {
                        setId(order._id);
                        handleOpen();
                        setorderDelete(false);
                      }}>
                      Shipped
                      <LocalShippingRoundedIcon />
                    </TableCell>
                    <TableCell
                      sx={{ color: "red" }}
                      onClick={() => {
                        setId(order._id);
                        handleOpen();
                        setorderDelete(true);
                      }}>
                      Delete
                      <DeleteRoundedIcon />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              OILVEO
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {orderDelete
                ? "Are You Sure to delete?"
                : " Are You sure to update the status ?"}
            </Typography>
            {orderDelete ? (
              <Button
                variant="contained"
                onClick={() => {
                  handleDelete();
                  handleClose();
                }}>
                DELETE
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  handleUpdate();
                  handleClose();
                }}>
                UPDATE
              </Button>
            )}
          </Box>
        </Fade>
      </Modal>
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
    </>
  );
};

export default ManageAllOrder;
