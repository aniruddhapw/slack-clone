import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import ChatInput from "./ChatInput";
import axios from "../axios";
import Message from "./Message";
import Pusher from "pusher-js";

const pusher = new Pusher("3f7e8cb85cbe0ced0ce2", {
  cluster: "ap2",
});
const Chat = ({ user }) => {
  const { roomId } = useParams();

  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  // console.log(user);
  const getConvo = () => {
    axios
      .get(`/get/conversation?id=${roomId}`)
      .then((res) => {
        setRoomDetails(res.data.channelName);
        setRoomMessages(res.data.conversation);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getConvo();
    const channel = pusher.subscribe("conversation");
    channel.bind("newMessage", function (data) {
      getConvo();
    });
  }, [roomId]);

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
        </div>
      </div>

      <div className="chat__messages">
        {roomMessages.map(({ message, timestamp, user, userImage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
          />
        ))}
      </div>

      <ChatInput channelName={roomDetails} channelId={roomId} user={user} />
    </div>
  );
};

export default Chat;
