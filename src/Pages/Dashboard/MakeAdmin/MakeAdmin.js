import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleObBlur = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    const user = { email };
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .put("https://oilveo.herokuapp.com/users/admin", { headers, user })
      .then((res) => {
        if (res.data.modifiedCount) {
          setSuccess(true);
        }
      });

    e.preventDefault();
  };
  return (
    <div>
      <h2>Make An Admin</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ width: "50%" }}
          onBlur={handleObBlur}
          label="Email"
          type="email"
          variant="standard"
        />
        <br />
        <br />
        <Button type="submit" variant="contained">
          Make Admin
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product Uploaded Successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MakeAdmin;
