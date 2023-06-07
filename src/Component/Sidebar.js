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
import axios from "../axios";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";

var pusher = new Pusher("3f7e8cb85cbe0ced0ce2", {
  cluster: "ap2",
});

const Sidebar = () => {
  const user = useSelector((state) => state.user.user);
  const [channels, setChannels] = useState([]);
  const [userDirect, setDirect] = useState([]);
  const getChannelList = () => {
    axios.get("/get/channelList").then((res) => {
      setChannels(res.data);
      console.log(res.data);
    });
  };
  const getUserList = () => {
    axios.get("/get/userList").then((res) => {
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
  // trying redux---------------------------------------------------

  const userRedux = useSelector((state) => state.user.user);
  console.log(userRedux + "we did it guyssss");
  console.log(userRedux);
  //--------------------------------

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Capstone project</h2>
          <h3>
            <FiberManualRecordIcon />
            {user.username}
          </h3>
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

      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      {channels.map((channel) => (
        <SidebarOption title={channel.name} id={channel.id} />
      ))}
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
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
    </div>
  );
};

export default Sidebar;
