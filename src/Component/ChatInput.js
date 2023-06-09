import Button from "@mui/material/Button";
import React, { useState } from "react";
import "./ChatInput.css";
import axios from "../axios";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

function ChatInput({ channelName, channelId, user }) {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    const now = new Date();
    const istTime = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    if (channelId) {
      axios.post(`/messages/new?id=${channelId}`, {
        message: input,
        timestamp: istTime,
        username: user.username,
        userImage: user.userImage,
        conversationId: channelId,
      });
    }
    setInput("");
  };
  return (
    <div className="chatInput">
      <form>
        <input
          className="message_input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}         Press enter to send message`}
        ></input>
        <Tooltip arrow TransitionComponent={Zoom} title="Send Message">
          <Button type="sumbit" className="send_btn" onClick={sendMessage}>
            SEND
          </Button>
        </Tooltip>
      </form>
    </div>
  );
}

export default ChatInput;
