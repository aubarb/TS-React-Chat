import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar: React.FC = () => {
  const [user] = useAuthState(auth);

  const signOut = ():void => {
    auth.signOut();
  };
  
  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : ""}
    </nav>
  );
};

export default NavBar;
