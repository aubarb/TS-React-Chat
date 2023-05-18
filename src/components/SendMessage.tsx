import React, { useContext, useState } from "react";
import { db } from "../firebase";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext, ChatContextType } from "../context/ChatContext";
import { v4 as uuidv4 } from "uuid";

interface SendMessageProps {
  scroll: React.MutableRefObject<HTMLSpanElement | null>;
}

const SendMessage: React.FC<SendMessageProps> = ({ scroll }) => {
  const [text, setText] = useState<string | undefined>("");
  const { currentUser } = useContext(AuthContext);
  const chatContext = useContext<ChatContextType | undefined>(ChatContext);
  const data = chatContext?.data;

  // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  const handleSend = async () => {
    if (data?.chatId !== "null") {
      console.log("data", data);
      await updateDoc(doc(db, "chats", data?.chatId || ""), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }

    //We update the lastMessage field in userChats to display it in SideBar.
    //Also update the date to display from most recent
    await updateDoc(doc(db, "userChats", currentUser?.uid || ""), {
      [data?.chatId + ".lastMessage"]: {
        //dynamic property name
        text,
      },
      [data?.chatId + ".date"]: serverTimestamp(),
    });

    //We do the same thing for other user.
    await updateDoc(doc(db, "userChats", data?.user.uid || ""), {
      [data?.chatId + ".lastMessage"]: {
        text,
      },
      [data?.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  }; // handle hitting Enter to send message

  return (
    <div className="sendMessage">
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="Type message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="send">
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default SendMessage;
