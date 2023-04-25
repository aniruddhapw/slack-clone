import React from "react";
import "./Message.css";

function Message({ message, timestamp, user, userImage }) {
  return (
    <div className="message">
      <img className="user_image" src={userImage} alt="" />
      <div className="message__info">
        <h4>
          {user} <span className="message__timestamp">{timestamp}</span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
