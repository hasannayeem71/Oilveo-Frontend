import {
  Alert,
  Button,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const UploadProducts = () => {
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newProduct = { ...product };
    newProduct[field] = value;

    setProduct(newProduct);
  };
  const handleSubmit = (e) => {
    axios.post(`https://oilveo.herokuapp.com/oils`, product).then((res) => {
      if (res.data.insertedId) {
        setOpen(true);
      }
    });
    //form default behavior prevent
    e.preventDefault();
  };
  return (
    <>
      <Typography variant="h4">ADD A NEW PRODUCT</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="productName"
          onBlur={handleOnBlur}
          variant="standard"
          sx={{ p: 1 / 2, width: "50%" }}
        />{" "}
        <br />
        <TextField
          label="Product Price"
          type="number"
          name="productPrice"
          onBlur={handleOnBlur}
          variant="standard"
          sx={{ p: 1 / 2, width: "50%" }}
        />{" "}
        <br />
        <TextareaAutosize
          label="Description"
          name="productDescription"
          onBlur={handleOnBlur}
          variant="standard"
          aria-label="empty textarea"
          placeholder="Description"
          style={{ width: "50%", padding: "15px", margin: "10px 0px" }}
        />
        <br />
        <TextField
          label="Stock"
          type="number"
          name="productInStock"
          onBlur={handleOnBlur}
          variant="standard"
          sx={{ p: 1 / 2, width: "50%" }}
        />{" "}
        <br />
        <TextField
          label="Product Image URL"
          name="productImg"
          onBlur={handleOnBlur}
          variant="standard"
          sx={{ p: 1 / 2, width: "50%" }}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ p: 1 / 2, width: "50%", mt: "3px" }}>
          Submit
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product Uploaded Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default UploadProducts;
