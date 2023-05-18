import React, { useContext, useEffect, useRef } from "react";
import { IMessage } from "../interface/interface";
import { AuthContext } from "../context/AuthContext";
import { ChatContext, ChatContextType } from "../context/ChatContext";


interface MessageProps {
  message: IMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const chatContext = useContext<ChatContextType | undefined>(ChatContext);
  const data = chatContext?.data;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser?.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          className=""
          src={
            message.senderId === currentUser?.uid
              ? currentUser?.photoURL || ""
              : data?.user.photoURL || ""
          }
          alt="user avatar"
        />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
      </div>
    </div>
  );
};
export default Message;
