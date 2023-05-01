import React, { useContext } from "react";
import "./SidebarOption.css";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import { UserContext } from "./UserContext";

const SidebarOption = ({
  Icon,
  id,
  addChannelOption,
  addDirectOption,
  title,
  user,
  reciver,
}) => {
  const sender = useContext(UserContext);

  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push(`/room/${title.toLowerCase()}`);
    }
    window.location.reload();
  };
  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      axios.post("/new/channel", {
        name: channelName,
      });
    }
  };
  const addDirect = (sender, reciver) => {
    console.log("addDirect");
    axios
      .post("/direct/new", {
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
          ? addChannel
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
    </div>
  );
};

export default SidebarOption;
