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
    { source === "adminUsers" ? (<div>  
    <Link onClick={() => setUserProfileHandler(user)} to={`/adminUsers/${userId}`} className="homeUser">
      <img src={avatar} alt={name} />
      <Typography>{name}</Typography>
    </Link>
    </div>
     ) : (<div>
    <Link to={`/user/${userId}`} className="homeUser">
      <img src={avatar} alt={name} />
      <Typography>{name}</Typography>
    </Link>
    </div>)}
    </div>
  )
};

export default User;
