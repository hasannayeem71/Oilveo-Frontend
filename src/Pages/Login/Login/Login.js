import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { logIn, logInWithPopUp, authError } = useAuth();
  const [loginData, setLoginData] = useState({});

  const history = useHistory();
  const location = useLocation();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    logIn(
      loginData.email,
      loginData.password,

      location,
      history
    );
    e.preventDefault();
  };
  return (
    <Container>
      {authError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {authError}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 8 }} variant="h4" gutterBottom>
            LOGIN
            <form onSubmit={handleLoginSubmit}>
              <TextField
                sx={{ width: "75%", m: 1 }}
                label="Your Email"
                name="email"
                onBlur={handleOnChange}
                variant="standard"
              />
              <TextField
                sx={{ width: "75%", m: 1 }}
                label="Your Password"
                name="password"
                onBlur={handleOnChange}
                type="password"
                variant="standard"
              />
              <Button
                type="submit"
                sx={{ width: "75%", m: 1 }}
                variant="contained">
                LOGIN
              </Button>{" "}
              <NavLink to="/register" style={{ textDecoration: "none" }}>
                <Button sx={{ width: "75%", m: 1 }} variant="text">
                  New user? Please register
                </Button>
              </NavLink>
            </form>
            <Button
              sx={{ width: 1 / 2, m: 1 }}
              variant="contained"
              onClick={() => logInWithPopUp(location, history)}>
              LOG IN WITH GOOGLE
            </Button>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <img
            src="https://shop.shajgoj.com/wp-content/uploads/2021/09/Olive-Oil-Rajkonna-01-750x750.png"
            alt=""
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
