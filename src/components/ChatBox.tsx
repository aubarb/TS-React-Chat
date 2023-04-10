import React from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox: React.FC = () => {

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        <Message />
      </div>
      <SendMessage />
    </main>
  );
};

export default ChatBox;