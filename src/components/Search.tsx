import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { IUser } from "../interface/interface";

const Search: React.FC = () => {
  const [userName, setUsername] = useState<string | undefined>("");
  const [user, setUser] = useState<IUser | null>(null);
  const [err, setErr] = useState<boolean>(false);
  const { currentUser } = useContext(AuthContext);

  //https://firebase.google.com/docs/firestore/query-data/queries

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data() as IUser);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    e.key === "Enter" && handleSearch();
  };

  const handleSelect = async (): Promise<void> => {
    //create a combined id that will be the id of the chat between 2 users.
    const combinedId =
      currentUser && user //check if currentUser and user exists first to avoid error
        ? currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid
        : "";
    //check if group (chats in firestore) exists, if not, create new one.
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats (for each user)
        await updateDoc(doc(db, "userChats", currentUser?.uid || ""), {
          [combinedId + ".userInfo"]: {
            //dynamic property name
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user?.uid || ""), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}

    //Then once search is done we clean search field
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="userpic" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
