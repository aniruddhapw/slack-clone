import Button from "@mui/material/Button";
import React, { useState } from "react";
import "./ChatInput.css";
import axios from "../axios";

function ChatInput({ channelName, channelId, user }) {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    const now = new Date();
    const istTime = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    if (channelId) {
      axios.post(`/new/message?id=${channelId}`, {
        message: input,
        timestamp: istTime,
        user: user.name,
        userImage: user.picture,
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
        <Button type="sumbit" className="send_btn" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </div>
  );
}

export default ChatInput;
