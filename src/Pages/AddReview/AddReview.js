import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const AddReview = () => {
  const [review, setReview] = useState({});
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  review.name = user.displayName;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newReview = { ...review };
    newReview[field] = value;
    setReview(newReview);
  };
  const handleSubmit = (e) => {
    axios
      .post(`https://oilveo.herokuapp.com/reviews/add`, review)
      .then((res) => {
        if (res.data.insertedId) {
          setOpen(true);
        }
      });
    e.preventDefault();
  };
  return (
    <>
      <Typography variant="h4">ADD REVIEW ABOUT US</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          onBlur={handleOnBlur}
          label="REVIEW"
          name="review"
          multiline
          rows={4}
          sx={{ width: "75%" }}
          placeholder="Write your Review here"
        />
        <br />
        <TextField
          onBlur={handleOnBlur}
          label="Rating"
          name="rating"
          rows={4}
          type="number"
          sx={{ width: "75%", my: 3 }}
          placeholder="Rating Out of 5"
        />
        <br />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          POST
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Review Added Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddReview;
