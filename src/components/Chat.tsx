import React, { useContext, useRef } from "react";
import { toast } from "react-toastify";
import { ChatContext, ChatContextType } from "../context/ChatContext";
import Cam from "../images/Cam.png";
import Add from "../images/Add.png";
import More from "../images/More.png";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

const Chat: React.FC = () => {
  const chatContext = useContext<ChatContextType | undefined>(ChatContext);
  const data = chatContext?.data;

  const scroll: React.MutableRefObject<HTMLSpanElement | null> = useRef(null);

  return (
    <main className="chat">
      <div className="chatInfo">
        <span>{data?.user.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="camera" onClick={() => toast.error("Available soon!")}/>
          <img src={Add} alt="Add friend" onClick={() => toast.error("Available soon!")}/>
          <img src={More} alt="More" onClick={() => toast.error("Available soon!")}/>
        </div>
      </div>
      <Messages />
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default Chat;
