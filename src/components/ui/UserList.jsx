import React from "react";
import UserCard from "./UserCard";

const UserList = ({ data }) => {
  return (
    <div className="flex flex-col gap-5">
      {data.map((user, index) => (
        <div key={index}>
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
};

export default UserList;
