import { Button, TextareaAutosize, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const UploadProducts = () => {
  const [product, setProduct] = useState({});
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newProduct = { ...product };
    newProduct[field] = value;
    console.log(newProduct);
    setProduct(newProduct);
  };
  const handleSubmit = (e) => {
    axios.post(`http://localhost:5000/oils`, product).then((res) => {
      if (res.data.insertedId) {
        alert("success");
      }
    });
    //form default behavior prevent
    e.preventDefault();
  };
  return (
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
  );
};

export default UploadProducts;
