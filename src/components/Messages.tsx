import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext, ChatContextType } from "../context/ChatContext";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { IMessage } from "../interface/interface";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<DocumentData | undefined>([]);
  const chatContext = useContext<ChatContextType | undefined>(ChatContext);
  const data = chatContext?.data;

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data?.chatId || ""), (doc) => {
      doc.exists() && setMessages(doc.data().messages as DocumentData);
    });

    return () => {
      unSub();
    };
  }, [data?.chatId]);

  return (
    <div className="messages">
      {messages?.map((message: IMessage) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};
export default Messages;
