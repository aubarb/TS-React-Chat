import React from "react";
import GoogleSignIn from "../images/google-signin.png";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { IUser } from "../interface/interface";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png"

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  //Signing in with Google Auth
  const googleSignIn = async () => {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    try {
      //Initiates the Google sign-in process
      const result = await signInWithPopup(auth, provider);
      const user: IUser = {
        displayName: result.user.displayName ?? "Unknown User",
        photoURL: result.user.photoURL ?? "",
        createdAt: serverTimestamp(),
        uid: result.user.uid,
      };
      //Return reference for current user document (wether it exists or not)
      const userRef = doc(db, "users", user.uid);
      // Retrieve the current snapshot of the document from the Firestore database
      const userSnap = await getDoc(userRef);
      //If user doesn't exist create a new document in the Firestore database with the user's information
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          uid: user.uid,
        });
        //Create the userChats collection for this user.
        await setDoc(doc(db, "userChats", user.uid), {});
        //Finally go to homepage
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="welcome">
      <img src={Logo} alt="logo" width={50} height={50} />
      <h1>Welcome to Aurèle Chat</h1>
      <p>Sign in with Google to chat with with your friends!</p>
      <button className="signIn">
        <img
          onClick={googleSignIn}
          src={GoogleSignIn}
          alt="sign in with google"
        />
      </button>
    </main>
  );
};

export default Welcome;
