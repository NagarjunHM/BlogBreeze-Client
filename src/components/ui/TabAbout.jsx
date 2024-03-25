import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UserProfileSkeleton from "./UserProfileSkeleton";
import { Button } from "./button";
import { userSlice } from "@/store/userSlice";

const TabAbout = () => {
  const instance = useAxios();
  const { usersId } = useParams();
  const { isAuthenticated } = userSlice();

  // fetch all following
  const user = useQuery({
    queryKey: ["users", usersId],
    queryFn: async () => {
      const response = await instance.get(`/users/${usersId}`);
      return response.data;
    },
  });

  if (user.isLoading) return <UserProfileSkeleton />;

  return (
    <div className="flex flex-col gap-5 max-w-[800px]">
      {/* avatar */}
      <div>
        <Avatar className="w-40 h-40">
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback className="text-7xl">
            {user.data.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
      {/* name */}
      <div className="text-2xl font-semibold">{user.data.name}</div>

      {/* Bio */}
      <div className=" text-muted-foreground text-pretty">
        {user.data?.description || "No description"}
      </div>

      {/* followers and following */}
      <div className="flex gap-5 font-semibold text-green-600">
        <div className="">{user.data?.followers.length}&nbsp;Followers</div>
        <div className="">{user.data?.following.length}&nbsp;Following</div>
      </div>

      {/* follow unfollow button */}
      {isAuthenticated && (
        <div>
          <Button variant="outline">Follow&nbsp;</Button>
        </div>
      )}
    </div>
  );
};

export default TabAbout;
