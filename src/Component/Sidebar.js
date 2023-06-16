import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import SidebarOption from "./SidebarOption";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import axios from "../axios";
import Pusher from "pusher-js";
import { styled } from "@mui/material/styles";

import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

var pusher = new Pusher("3f7e8cb85cbe0ced0ce2", {
  cluster: "ap2",
});

const Sidebar = () => {
  const user = useSelector((state) => state.user.user);
  const [channelName, setChannelName] = useState("");

  const [channels, setChannels] = useState([]);
  const [userDirect, setDirect] = useState([]);
  const getChannelList = () => {
    axios.get("/conversations/channelList").then((res) => {
      setChannels(res.data);
      console.log(res.data);
    });
  };
  const getUserList = () => {
    axios.get("/users/userList").then((res) => {
      setDirect(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getChannelList();
    getUserList();
    const channel = pusher.subscribe("conversations");
    channel.bind("newConversation", function (data) {
      getChannelList();
    });
    const user = pusher.subscribe("users");
    channel.bind("newUser", function (data) {
      getUserList();
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const createChannel = () => {
    if (channelName) {
      axios.post("/conversations/channel", {
        name: channelName,
      });
    }
    setOpen(false);

    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
    setChannelName("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#6d1b7b", // Replace with your desired button color
    color: "#ffffff", // Replace with your desired text color
    "&:hover": {
      backgroundColor: "#6d1b7b", // Replace with your desired hover color
    },
  }));

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Capstone project</h2>
          <Tooltip arrow TransitionComponent={Zoom} title="Name of User">
            <h3>
              <FiberManualRecordIcon />
              {user.username}
            </h3>
          </Tooltip>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      {/* <SidebarOption Icon={DeleteIcon} title="Show less" /> */}

      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      {channels.map((channel) => (
        <SidebarOption title={channel.name} id={channel.id} />
      ))}

      <SidebarOption
        Icon={AddIcon}
        onClick={handleClickOpen}
        addChannelOption
        title="Add Channel"
      />

      <hr />

      {userDirect.map((user) => (
        <SidebarOption
          title={user.username}
          addDirectOption
          id={user._id}
          reciver={user._id}
          user={user._id}
        />
      ))}
      <hr />

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

          <CustomButton onClick={createChannel}>Create</CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
