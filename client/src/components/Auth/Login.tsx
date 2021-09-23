import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";
import * as L from "./AuthElements";
import { muiConstants } from "../../utilities/muiConstants";
import { login_success } from "../../utilities/notifications";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    // must set credential to true in order to set cookie
    axios.defaults.withCredentials = true;

    const { username, password } = form as any;
    const URL = "http://localhost:5000/auth";
    const PROFILE = "http://localhost:5000/profile";
    try {
      const resp = await axios.post(URL + "/login", {
        username,
        password,
      });

      console.log(resp.status);
      if (resp.status === 200) {
        const user = await axios.get(PROFILE);
        setLoggedIn(true);
        setUser(user.data);
        login_success(user.data);
      } else {
        alert(resp.data.message);
      }
    } catch (err: any) {
      /**
       * @desc err only returns statusCode whereas err.response returns object
       */
      console.log(err.response.data);
      alert(err.response.data.error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };
  if (loggedIn) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem 2.4rem ",
          marginTop: "2rem",
          background: `white`,
          borderRadius: "10px",
        }}
      >
        Welcome, &nbsp;<b style={{ color: "RebeccaPurple" }}>{user}</b>.
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1.2rem 2.4rem 2.4rem",
        marginTop: "2rem",
        background: `white`,
        borderRadius: "10px",
      }}
    >
      <form id="loginForm" onSubmit={handleSubmit} autoComplete="off">
        <TextField
          type="text"
          inputProps={{ "aria-label": "username", style: muiConstants.input }}
          name="username"
          fullWidth
          sx={{ my: 1 }}
          id="login-username"
          label={muiConstants.label("username")}
          variant="outlined"
          onChange={handleChange}
          required
        />
        <TextField
          type="password"
          inputProps={{
            "aria-label": "password",
            style: muiConstants.input,
          }}
          name="password"
          fullWidth
          sx={{ my: 1 }}
          id="login-password"
          label={muiConstants.label("password")}
          variant="outlined"
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        form="loginForm"
        value="Submit"
        sx={{ mt: 1, p: 1.2, fontSize: "1.2rem", letterSpacing: "0.1rem" }}
      >
        Login
      </Button>
      <Box mt={1.5}>
        No account yet? <L.Register href="/signup">Register</L.Register>
      </Box>
    </div>
  );
};

export default Login;
