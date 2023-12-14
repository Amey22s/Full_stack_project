import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logoutAdmin } from "../../Actions/Admin";
import "./AdminAccount.css";

const AdminAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();


  const logoutHandler = () => {
    dispatch(logoutAdmin());
    navigate('/');
    alert.success("Logged out successfully");
  };

  return (
    <div className="account">
      <div className="accountright">

        <Typography variant="h5"> Welcome Admin</Typography>

        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminAccount;
