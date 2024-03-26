import React from "react";
import UserCard from "./UserCard";
import { userSlice } from "@/store/userSlice";

const UserList = ({ profileUser, currentUser }) => {
  // getting logged in user id
  const { id } = userSlice();

  const isFollowing = (userId) => {
    return currentUser.some((user) => user._id === userId);
  };

  const renderFollowButton = (user) => {
    if (user._id === id) {
      return <div className="text-sm font-bold ">You</div>;
    }
    const isUserFollowed = isFollowing(user._id);

    if (isUserFollowed) {
      return (
        <div className="text-sm font-bold text-green-600 cursor-pointer hover:underline">
          Following
        </div>
      ); // Render 'Following' button if user is followed
    } else {
      return (
        <div className="text-sm font-bold text-green-600 cursor-pointer hover:underline">
          Follow
        </div>
      ); // Render 'Follow' button if user is not followed
    }
  };

  if (profileUser.length === 0)
    return (
      <div className="flex gap-2 text-xl underline cursor-default">
        No users found
      </div>
    );

  return (
    <div className="flex flex-col gap-5">
      {profileUser.map((user, index) => (
        <div key={index} className="flex gap-5">
          <UserCard user={user} />
          {/* {renderFollowButton(user)} */}
        </div>
      ))}
    </div>
  );
};

export default UserList;
