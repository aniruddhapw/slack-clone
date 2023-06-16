import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";

const Header = ({ onLogout }) => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
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
        <Tooltip arrow TransitionComponent={Zoom} title="Logout">
          <button className="logout_btn" onClick={onLogout}>
            Logout
          </button>
          {/* <Button variant="outlined" color="error">
            Error
          </Button> */}
        </Tooltip>
        <img className="user_image_header" src={user.userImage} alt="" />
      </div>
    </div>
  );
};

export default Header;
