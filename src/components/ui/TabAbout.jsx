import React from "react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Skeleton } from "./skeleton";
import UserProfileSkeleton from "./UserProfileSkeleton";

const TabAbout = () => {
  const instance = useAxios();
  const { usersId } = useParams();

  // fetch all following
  const user = useQuery({
    queryKey: ["users", usersId],
    queryFn: async () => {
      const response = await instance.get(`/users/${usersId}`);
      return response.data;
    },
  });

  console.log(user.data);

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
      <div className="text-xl text-muted-foreground text-pretty">
        {user.data?.description}
      </div>
      {/* followers and following */}
      <div className="flex gap-5">
        <Button>Followers &nbsp; {user.data?.followers.length}</Button>
        <Button>Following &nbsp; {user.data?.following.length}</Button>
      </div>
    </div>
  );
};

export default TabAbout;
