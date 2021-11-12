import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Fade,
  Modal,
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
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    axios.get(`https://oilveo.herokuapp.com/oils`).then((res) => {
      setProducts(res.data);

      setLoading(false);
    });
  }, []);

  //functions
  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };
  const handleDelete = () => {
    axios
      .delete(`https://oilveo.herokuapp.com/oils/delete/${id}`)
      .then((res) => {
        if (res.data.acknowledged) {
          setProducts(products.filter((pd) => pd._id !== id));
          setSuccess(true);
          setId("");
        }
      });
  };
  if (loading) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  } else if (products.length === 0) {
    return (
      <div>
        <h3>No data hare...</h3>
      </div>
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
                <TableCell>Stock</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image url</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => {
                return (
                  <TableRow hover role="checkbox" key={product._id}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.productPrice}</TableCell>
                    <TableCell>{product.productInStock}</TableCell>
                    <TableCell>
                      <Accordion
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "100%",
                            md: "50%",
                            lg: "70%",
                          },
                        }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header">
                          <Typography>
                            {product.productDescription.slice(0, 22)}...
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{product.productDescription}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>

                    <TableCell>{product.productImg}</TableCell>
                    <TableCell
                      sx={{ color: "red", width: "10%" }}
                      onClick={() => {
                        setId(product._id);
                        handleOpen();
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
              "Are You Sure to delete?"
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
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleMessageClose}>
        <Alert
          onClose={handleMessageClose}
          severity="success"
          sx={{ width: "100%" }}>
          Successfully deleted
        </Alert>
      </Snackbar>
    </>
  );
};

export default ManageProducts;
