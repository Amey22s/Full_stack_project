import React, { useState } from "react";
import "./AdminHeader.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  AccountCircle,
  AccountCircleOutlined,
  Image,
  ImageOutlined,
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

      <Link to="/allAccounts" onClick={() => setTab("/allAccounts")}>
        {tab === "/allAccounts" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>

      <Link to="/allPosts" onClick={() => setTab("/allPosts")}>
        {tab === "/allPosts" ? (
          <Image style={{ color: "black" }} />
        ) : (
          <ImageOutlined />
        )}
      </Link>
    </div>
  );
};

export default AdminHeader;
