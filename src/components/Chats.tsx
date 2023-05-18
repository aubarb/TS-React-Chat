import React, { useContext, useEffect, useState } from "react";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext, ChatContextType } from "../context/ChatContext";
import { User } from "firebase/auth";

const Chats: React.FC = () => {
  const [chats, setChats] = useState<DocumentData | undefined>([]);
  const { currentUser } = useContext(AuthContext);
  const chatContext = useContext<ChatContextType | undefined>(ChatContext);
  const dispatch = chatContext?.dispatch;

  //https://firebase.google.com/docs/firestore/query-data/listen
  //This is to get data in real time, it listens for any change in the chat and updates.
  //So we get all chats data for current user.
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser?.uid || ""),
        (doc) => {
          setChats(doc.data() as DocumentData);
        }
      );

      return () => {
        unsub();
      };
    };
    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u: User) => {
    dispatch?.({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {/*We return an array of key value pairs from chat object and iterate through, [0] being the id and [1] object containing the other info
      We also sort it according to the date to have the latest messages on top*/}
      {Object.entries(chats || {})
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
