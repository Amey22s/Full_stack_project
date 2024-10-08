import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, guestLogin } from "../../Actions/User";
import { useAlert } from "react-alert";


import {traderLogin} from '../../Actions/Trader';

import { adminLogin } from "../../Actions/Admin";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  };


  const traderLoginHandler = (e) => {
    e.preventDefault();

    dispatch(traderLogin(email,password));
    navigate('/marketplace');
  } 

  const adminLoginHandler = (e) => {
    e.preventDefault();

    dispatch(adminLogin(email, password));
    navigate('/');
  };
  
  const handleGuestLogin = () => {
    dispatch(guestLogin());
    navigate('/');
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          NEU Social App
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        

        <Button type="submit">Login</Button>
        <Button onClick={traderLoginHandler}>
          Login as Trader
        </Button>
        <Button onClick={handleGuestLogin}>
          Login as Guest
        </Button>

        <Button onClick={adminLoginHandler}>
          Login as Admin
        </Button>
        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>
        <Link to='/registerTrader'>
          <Typography>New Trader?</Typography>
        </Link>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>

        <Link to="/registerAdmin">
          <Typography>Admin Register</Typography>
        </Link>

      </form>
    </div>
  );
};

export default Login;
