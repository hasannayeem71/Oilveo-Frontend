import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const [loginData, setLoginData] = useState({});
  // const {registerUser}= useAuth
  const history = useHistory();

  const { registerUser, loading, user, authError } = useAuth();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    if (loginData.password !== loginData.password2) {
      alert("password did not match");
      return;
    }
    registerUser(loginData.email, loginData.password, loginData.name, history);
    e.preventDefault();
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography sx={{ mt: 8 }} variant="h4" gutterBottom>
              REGISTER
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  sx={{ width: "75%", m: 1 }}
                  label="Your Name"
                  type="text"
                  name="name"
                  onBlur={handleOnBlur}
                  variant="standard"
                />
                <TextField
                  sx={{ width: "75%", m: 1 }}
                  label="Your Email"
                  type="email"
                  name="email"
                  onBlur={handleOnBlur}
                  variant="standard"
                />
                <TextField
                  sx={{ width: "75%", m: 1 }}
                  label="Your Password"
                  name="password"
                  onBlur={handleOnBlur}
                  type="password"
                  variant="standard"
                />
                <TextField
                  sx={{ width: "75%", m: 1 }}
                  label="Re Type Your Password"
                  name="password2"
                  onBlur={handleOnBlur}
                  type="password"
                  variant="standard"
                />
                <Button
                  type="submit"
                  sx={{ width: "75%", m: 1 }}
                  variant="contained">
                  REGISTER
                </Button>{" "}
                <NavLink to="/login" style={{ textDecoration: "none" }}>
                  <Button sx={{ width: "75%", m: 1 }} variant="text">
                    Already Registered? Please Login.
                  </Button>
                </NavLink>
              </form>
              {user && (
                <Alert severity="success">
                  <AlertTitle>User created successfully</AlertTitle>
                </Alert>
              )}
              {authError && <Alert severity="error">{authError}</Alert>}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <img src="" alt="" style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
