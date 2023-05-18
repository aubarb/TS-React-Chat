import React, { useContext, useRef } from "react";
import Cam from "../images/Cam.png";
import Add from "../images/Add.png";
import More from "../images/More.png";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { ChatContext, ChatContextType } from "../context/ChatContext";

const Chat: React.FC = () => {
  const chatContext = useContext<ChatContextType | undefined>(ChatContext);
  const data = chatContext?.data;

  const scroll: React.MutableRefObject<HTMLSpanElement | null> = useRef(null);

  return (
    <main className="chat">
      <div className="chatInfo">
        <span>{data?.user.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="camera" />
          <img src={Add} alt="Add friend" />
          <img src={More} alt="More" />
        </div>
      </div>
      <Messages />
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default Chat;
