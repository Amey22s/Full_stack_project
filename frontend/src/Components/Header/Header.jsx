import React, { useState } from "react";
import "./Header.css";
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

const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>

      <Link to="/inbox" onClick={() => setTab("/inbox")}>
        {tab === "/inbox" ? (
          <Message style={{ color: "black" }} />
        ) : (
          <MessageOutlined />
        )}
      </Link>

      <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>


      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "black" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>
      <Link to="/marketplace" onClick={() => setTab("/marketplace")}>
        {tab === "/marketplace" ? (
          <Store style={{ color: "black" }} />
        ) : (
          <StoreOutlined />
        )}
      </Link>

      <Link to="/news" onClick={() => setTab("/news")}>
        {tab === "/news" ? (
          <Newspaper style={{ color: "black" }} />
        ) : (
          <NewspaperOutlined />
        )}
      </Link>

      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>


      <Link to="/newitem" onClick={() => setTab("/newitem")}>
        {tab === "/newitem" ? (
          <Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>

      


    </div>
  );
};

export default Header;
