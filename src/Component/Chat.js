import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatInput from "./ChatInput";
import axios from "../axios";
import Message from "./Message";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
const pusher = new Pusher("3f7e8cb85cbe0ced0ce2", {
  cluster: "ap2",
});
const Chat = () => {
  const { roomId } = useParams();

  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const getConvo = (user) => {
    axios
      .get(`/messages/getConvo?id=${roomId}&userId=${user._id}`)
      .then((res) => {
        console.log(res);
        setRoomDetails(res.data.name);
        setRoomMessages(res.data.messages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getConvo(user);
    const channel = pusher.subscribe("conversations");
    channel.bind("newMessage", function (data) {
      getConvo(user);
    });
    const message = pusher.subscribe(`conversation-${roomId}`);
    message.bind("newMessage", function (data) {
      getConvo(user);
      if (Notification.permission === "granted") {
        new Notification(`New message from ${data.message.username}`, {
          body: data.message.message,
          icon: data.message.userImage,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(`New message from ${data.message.username}`, {
              body: data.message.message,
              icon: data.message.userImage,
            });
          }
        });
      }
    });
  }, [roomId]);
  const handleDelete = async () => {
    try {
      // Send DELETE request to the API endpoint
      await axios.delete(`/conversations/delete/${roomId}`);
      console.log("Conversation deleted successfully");
      // Perform any additional actions after successful deletion
    } catch (error) {
      console.error("Error deleting conversation:", error);
      // Handle error state or display error message to the user
    }
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{roomDetails}</strong>
            {/* <strong>#general</strong> */}
            <StarBorderOutlined />
          </h4>
        </div>

        <div className="chat__headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
          <div className="delete_btn" onClick={handleDelete}>
            <Tooltip
              arrow
              TransitionComponent={Zoom}
              title="Delete this conversation"
            >
              <DeleteIcon />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="chat__messages">
        {roomMessages.map(
          ({ message, timestamp, username, userImage, conversationId }) => (
            <Message
              message={message}
              timestamp={timestamp}
              user={username}
              userImage={userImage}
              conversationId={conversationId}
            />
          )
        )}
      </div>

      <ChatInput channelName={roomDetails} channelId={roomId} user={user} />
    </div>
  );
};

export default Chat;
