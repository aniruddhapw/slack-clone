import React, { useContext } from "react";
import "./SidebarOption.css";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// import { UserContext } from "./UserContext";
import { useSelector } from "react-redux";

const SidebarOption = ({
  Icon,
  id,
  addChannelOption,
  addDirectOption,
  title,
  onClick,
  isOnline,
  lastSeen,
  reciver,
}) => {
  // const sender = useContext(UserContext);
  const [channelName, setChannelName] = useState("");
  const sender = useSelector((state) => state.user.user);

  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push(`/room/${title.toLowerCase()}`);
    }
    window.location.reload();
  };

  const addDirect = (sender, reciver) => {
    console.log("addDirect");
    axios
      .post("/conversations/direct/new", {
        sender: sender,
        receiver: reciver,
      })
      .then((response) => {
        console.log(response.data);
        // Newly created conversation object
        if (response.data._id) {
          history.push(`/room/${response.data._id}`);
          window.location.reload();
        } else {
          history.push(`/room/${title.toLowerCase()}`);
        }
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="sidebarOption"
      // onClick={addChannelOption ? addChannel : selectChannel}
      onClick={
        addChannelOption
          ? onClick
          : addDirectOption
          ? () => addDirect(sender._id, reciver)
          : selectChannel
      }
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <div className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span> 
          <span className="sidebarOption__title" title={title.trim()}>
            {title.trim()}
          </span>
          {isOnline &&
            <span className="sidebarOption__online"></span>
          }
        </div>
      )}
    </div>
  );
};

export default SidebarOption;
