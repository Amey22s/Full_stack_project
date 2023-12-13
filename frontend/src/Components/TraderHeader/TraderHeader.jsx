import React, { useState } from "react";
import "./TraderHeader.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,

  Store,
  StoreOutlined,

  Message,
  MessageOutlined,
  Newspaper,
  NewspaperOutlined

} from "@mui/icons-material";

const TraderHeader = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
      

      <Link to="/marketplace" onClick={() => setTab("/marketplace")}>
        {tab === "/marketplace" ? (
          <Store style={{ color: "black" }} />
        ) : (
          <StoreOutlined />
        )}
      </Link>

      <Link to="/newitem" onClick={() => setTab("/newitem")}>
        {tab === "/newitem" ? (
          <Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
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

export default TraderHeader;
