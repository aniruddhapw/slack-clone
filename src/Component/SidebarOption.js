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
  user,
  reciver,
}) => {
  // const sender = useContext(UserContext);
  const [channelName, setChannelName] = useState("");
  const sender = useSelector((state) => state.user.user);

  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("open:", open);
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);

    console.log(reason);

    console.log(open);
    // const channelName = prompt("Please enter the channel name");
  };
  const createChannel = () => {
    if (channelName) {
      axios.post("/conversations/channel", {
        name: channelName,
      });
    }
    setOpen(false);
    handleClose();
  };
  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push(`/room/${title.toLowerCase()}`);
    }
    window.location.reload();
  };
  const addChannel = () => {
    handleClickOpen();
    // const channelName = prompt("Please enter the channel name");
    // if (channelName) {
    //   axios.post("/new/channel", {
    //     name: channelName,
    //   });
    // }
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
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash"> # </span> {title}
        </h3>
      )}

      {/* -------------------------------- */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter name of channel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createChannel}>Create</Button>
        </DialogActions>
      </Dialog>
      {/* <AddChannelDialog open={open} onClose={handleClose} /> */}
    </div>
  );
};

export default SidebarOption;
