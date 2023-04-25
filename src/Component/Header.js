import React from "react";
import "./Header.css";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Header = ({ onLogout }) => {
  return (
    <div className="header">
      <div className="header__left">
        <AccessTimeIcon />
      </div>

      <div className="header__search">
        <SearchIcon />
        <input placeholder="Search me" />
      </div>

      <div className="header__right">
        <HelpOutlineIcon />
        <button className="logout_btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
