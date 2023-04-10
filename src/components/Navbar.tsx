import React from "react";
import GoogleSignIn from "../images/google-signin.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const NavBar: React.FC = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = (): void => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
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
      ) : (
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignIn}
            alt="sign in with google"
          />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
