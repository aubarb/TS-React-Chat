import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
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
  const [users, setUsers] = useState<IUser[]>([]);
  const { currentUser } = useContext(AuthContext);

  //https://firebase.google.com/docs/firestore/query-data/queries

  const handleSearch = async () => {
    if (!userName) {
      setUsers([]);
      return;
    }
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", userName),
      where("displayName", "<=", userName + "\uf8ff")
    );

    try {
      const querySnapshot = await getDocs(q);
      const matchedUsers: IUser[] = [];
      querySnapshot.forEach((doc) => {
        matchedUsers.push(doc.data() as IUser);
      });
      setUsers(matchedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    e.key === "Enter" && handleSearch();
  };

  const handleSelect = async (selectedUser: IUser): Promise<void> => {
    if (!currentUser || !selectedUser) {
      // Display an error or handle the case where no user is selected
      toast.error("No user selected");
      return;
    }
    if (currentUser.uid === selectedUser.uid) {
      // Display an error or handle the case where try to select himself
      toast.error("Cannot chat with yourself");
      return;
    }
    //create a combined id that will be the id of the chat between 2 users.
    const combinedId =
      currentUser && selectedUser //check if currentUser and user exists first to avoid error
        ? currentUser.uid > selectedUser.uid
          ? currentUser.uid + selectedUser.uid
          : selectedUser.uid + currentUser.uid
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
            uid: selectedUser?.uid,
            displayName: selectedUser?.displayName,
            photoURL: selectedUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", selectedUser?.uid || ""), {
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
    setUsers([]);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyUp={handleKey}
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {users.length > 0 &&
        // Render each matching user
        users.map((user) => (
          <div
            key={user.uid}
            className="userChat"
            onClick={() => handleSelect(user)}
          >
            <img src={user.photoURL} alt="userpic" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
