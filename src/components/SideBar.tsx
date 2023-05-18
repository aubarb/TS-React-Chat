import React from "react";
import NavBar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

export const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      <NavBar />
      <Search />
      <Chats />
    </div>
  );
};
