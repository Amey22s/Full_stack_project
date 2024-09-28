import React, { useState } from "react";
import "./AdminHeader.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  AccountCircle,
  AccountCircleOutlined,
  People,
  PeopleOutlined,
} from "@mui/icons-material";

const AdminHeader = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? (
          <Home style={{ color: "black" }} />
        ) : (
          <HomeOutlined />
        )}
      </Link>


      <Link to="/allUsers" onClick={() => setTab("/allUsers")}>
         {tab === "/allUsers" ? (
           <People style={{ color: "black" }} />
         ) : (
           <PeopleOutlined />
         )}
       </Link>

       
      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
       
    </div>
  );
};

export default AdminHeader;
