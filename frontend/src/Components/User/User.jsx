import { Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserProfile } from "../../Actions/Admin";

const User = ({ source, userId, name, avatar, user }) => {

  const dispatch = useDispatch();
  const setUserProfileHandler = (user) => dispatch(setUserProfile(user));

  return (
  <div>
    <Link onClick={() => setUserProfileHandler(user)} to={ (source === "adminUsers") ? `/adminUsers/${userId}` : ((source === "from inbox" ? `/inbox/${userId}` : `/user/${userId}` ))} className="homeUser">
    <img src={avatar} alt={name} />
    <Typography>{name}</Typography>
  </Link>
  </div>
  )
};

export default User;
