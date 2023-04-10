import React from "react";
import GoogleSignIn from "../images/google-signin.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const Welcome: React.FC = () => {

  const googleSignIn = () => {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <main className="welcome">
      <h2>Welcome to React Chat.</h2>
      <img src="/logo512.png" alt="ReactJs logo" width={50} height={50} />
      <p>Sign in with Google to chat with with your fellow React Developers.</p>
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={GoogleSignIn}
          alt="sign in with google"
        />
      </button>
    </main>
  );
}

export default Welcome;