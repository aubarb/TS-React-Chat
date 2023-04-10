import React from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import NavBar from "./components/Navbar";
import Welcome from "./components/Welcome";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {`${error}`}</div>;
  }

  return (
    <div className="App">
      <NavBar />
      {!user ? <Welcome /> : <ChatBox />}
    </div>
  );
};

export default App;
