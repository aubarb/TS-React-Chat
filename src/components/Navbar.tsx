import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Logo from "../images/logo.png";

const NavBar: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  const signOut = (): void => {
    auth.signOut();
  };

  return (
    <nav className="navbar">
      <img className="logo" src={Logo} alt="logo" />
      <div className="user">
        <img
          src={currentUser?.photoURL ?? "/default-avatar.png"}
          alt="profil pic"
        />
        <span>{currentUser?.displayName ?? "Anonymous"}</span>
        <button onClick={signOut} className="logout" type="button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
