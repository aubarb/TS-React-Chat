// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBD4yrRKtF8AO_gM9ZDGQXQv19sK0vTAOw",
  authDomain: "ts-react-chat.firebaseapp.com",
  projectId: "ts-react-chat",
  storageBucket: "ts-react-chat.appspot.com",
  messagingSenderId: "184304371030",
  appId: "1:184304371030:web:7d3c11932af2c2383b82f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);