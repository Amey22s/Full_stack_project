import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  Typography,
  Button,
  TextField
} from "@mui/material";
import "./AdminRegister.css";
import { registerAdmin } from "../../Actions/Admin";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.admin);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerAdmin(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);

  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Admin Register
        </Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          required
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          required
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Register Admin
        </Button>
      </form>
    </div>
  );
};

export default AdminRegister;
