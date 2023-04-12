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
import { IUser } from "../interface/interface";
import { User } from "./Users";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  
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

  useEffect((): (() => void) => {
    const q = query(
      collection(db, "users"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let users: IUser[] = [];
      QuerySnapshot.forEach((doc) => {
        users.push({
          avatar: doc.data().avatar,
          name: doc.data().name,
          createdAt: doc.data().createdAt,
          uid: doc.data().uid,
        })
      });
      setUsers(users);
    });
    return ():void => unsubscribe();
  }, []);

  const scroll: React.MutableRefObject<HTMLSpanElement | null> = useRef(null);

  return (
    <main className="chat-box">
      <div  className="user-list">
        {users?.map((user) => (
          <User key={user.uid} user={user} />
        ))}
      </div>
      <div className="message-window">
        <div className="messages-wrapper">
          {messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <span ref={scroll}></span>
        <SendMessage scroll={scroll} />
      </div>
    </main>
  );
};

export default ChatBox;
