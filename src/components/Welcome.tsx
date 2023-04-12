import React from "react";
import GoogleSignIn from "../images/google-signin.png";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { IUser } from "../interface/interface";

const Welcome: React.FC = () => {
  const googleSignIn = async () => {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user: IUser = {
        name: result.user.displayName,
        avatar: result.user.photoURL,
        createdAt: serverTimestamp(),
        uid: result.user.uid,
      };
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.name,
          avatar: user.avatar,
          createdAt: serverTimestamp(),
          uid: user.uid,
        });
      }
    } catch (error) {
      console.error(error);
    }
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
};

export default Welcome;
