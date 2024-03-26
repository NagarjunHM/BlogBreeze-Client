import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className="flex items-center  gap-5 min-w-[500px]">
      <Avatar>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col flex-1">
        <Link to={`/users/${user._id}`} className="mb-1 text-sm font-semibold">
          {user.name}
        </Link>
        <div className="text-sm text-muted-foreground">{user?.description}</div>
      </div>
    </div>
  );
};

export default UserCard;
