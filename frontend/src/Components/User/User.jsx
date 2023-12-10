import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const User = ({ source, userId, name, avatar }) => {
  return (
    <div>
    { source === "from inbox" ? (<div>  
    <Link to={`/inbox/${userId}`} className="homeUser">
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
