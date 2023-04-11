import React from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useEffect, useState, useRef } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { IMessage } from "../interface/interface";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  
  useEffect((): (() => void) => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages: IMessage[] = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({
          avatar: doc.data().avatar,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          name: doc.data().name,
          uid: doc.data().uid,
          id: doc.id
        })
      });
      setMessages(messages);
    });
    return ():void => unsubscribe();
  }, []);

  const scroll: React.MutableRefObject<HTMLSpanElement | null> = useRef(null);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
