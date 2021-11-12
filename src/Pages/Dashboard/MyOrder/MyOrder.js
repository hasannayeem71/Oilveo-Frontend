import { Button, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const MyOrder = ({ myOrder, setOrders, orders, setMessage, setSuccess }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { productImg, productName, status, _id } = myOrder;
  const handleDelete = () => {
    axios.delete(`https://oilveo.herokuapp.com/order/${_id}`).then((res) => {
      if (res.data.acknowledged) {
        const reminding = orders.filter((order) => order._id !== _id);
        setOrders(reminding);
        setSuccess(true);
        setMessage("Order deleted successfully");
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "10px",
      }}>
      <div style={{ display: "flex" }}>
        <img src={productImg} alt="" style={{ width: "20%" }} />
        <div>
          <h4>{productName}</h4>
          <small>{status}</small>
          <br />
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={handleOpen}>
            DELETE
          </Button>
        </div>
      </div>
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
              Are You Sure to delete?
            </Typography>

            <Button
              variant="contained"
              onClick={() => {
                handleDelete();
                handleClose();
              }}>
              DELETE
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default MyOrder;
