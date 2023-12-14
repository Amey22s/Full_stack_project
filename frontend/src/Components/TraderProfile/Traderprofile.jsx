import React, { useEffect } from "react";
import { Avatar, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { logoutTrader } from "../../Actions/Trader";
import {
  getTraderProfile,
  // Add any other actions you might need for the trader
} from "../../Actions/Trader";

const TraderProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const logoutHandler = () => {
    dispatch(logoutTrader());
  };
  const {
    trader,
    loading: traderLoading,
    error: traderError,
  } = useSelector((state) => state.traderProfile);
  //console.log(trader, "after use selector traderprofile")
  const {
    trader: me
  } = useSelector((state) => state.trader);

  useEffect(() => {
    dispatch(getTraderProfile(me._id));
    // Dispatch any additional actions to fetch trader's data
  }, [dispatch, me._id]);
  //console.log("inside trader profile", trader)
  useEffect(() => {
    if (traderError) {
      alert.error(traderError);
      dispatch({ type: "clearErrors" });
    }
    // Add any additional error handling for trader actions
  }, [alert, traderError, dispatch]);

  return traderLoading ? (
    <Loader />
  ) : (
    <div className="traderProfile">
      {trader && (
        <>
         
          {trader && trader.avatar && (
  <div className="accountright">
    <Avatar
      src={trader.avatar.url}
      sx={{ height: "8vmax", width: "8vmax" }}
    />
    <Typography variant="h5">{trader.name}</Typography>
  </div>
)}

          <div className="accountright">
            <div>
              <Typography variant="h6">Items Posted</Typography>
              <Typography>{trader.itemsPosted.length}</Typography>
            </div>

            <div>
              <Typography variant="h6">Items Bought</Typography>
              <Typography>{trader.itemsBought.length}</Typography>
            </div>

            <div>
              <Typography variant="h6">Items Sold</Typography>
              <Typography>{trader.itemsSold.length}</Typography>
            </div>

            <Button variant="contained" onClick={logoutHandler}>Logout</Button>

            {/* Add any additional trader-specific information here */}
            
          </div>
        </>
      )}
    </div>
  );
};

export default TraderProfile;
