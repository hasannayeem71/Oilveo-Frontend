import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Navigation from "../../Shared/Navigation/Navigation";

const Login = () => {
  const { logInWithPopUp } = useAuth();
  return (
    <Navigation>
      <Button variant="contained" onClick={logInWithPopUp}>
        Login with Google
      </Button>
      <br />
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button variant="text">New at Oliveo? Register</Button>
      </Link>
    </Navigation>
  );
};

export default Login;
