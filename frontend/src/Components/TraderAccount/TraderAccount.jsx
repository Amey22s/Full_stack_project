import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutTrader } from "../../Actions/Trader";
import "./TraderAccount.css";

const TraderAccount = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutTrader());
  };

  return (
    <div className="account">
      <div className="accountright">

        <Typography variant="h5"> Welcome Trader</Typography>

        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default TraderAccount;
