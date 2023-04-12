import React from "react";
import { IUser } from "../interface/interface";

interface UserProps {
  user: IUser;
}

export const User: React.FC<UserProps> = ({ user }) => {
  return (
    <div>
      <img
        src={user.avatar ?? undefined}
        alt="user avatar"
      />
      <h2>{user.name}</h2>
    </div>
  );
};
