import React from "react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const TabAbout = () => {
  const instance = useAxios();
  const { usersId } = useParams();

  // fetch all followers
  const followers = useQuery({
    queryKey: ["followers", usersId],
    queryFn: async () => {
      const response = await instance.get(`/follow/followers/${usersId}`);
      return response.data;
    },
  });

  // fetch all following
  const following = useQuery({
    queryKey: ["following", usersId],
    queryFn: async () => {
      const response = await instance.get(`/follow/following/${usersId}`);
      return response.data;
    },
  });

  return (
    <div className="flex flex-col gap-5 max-w-[800px]">
      {/* avatar */}
      <div>
        <Avatar className="w-24 h-24">
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback className="text-4xl">CN</AvatarFallback>
        </Avatar>
      </div>

      {/* name */}
      <div className="text-2xl font-semibold">Name of the author</div>

      {/* Bio */}
      <div className="text-xl text-muted-foreground text-pretty">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        expedita dolore doloremque? Odit saepe est laboriosam aut, inventore cum
        natus minima obcaecati quidem veniam eum praesentium! Saepe nam numquam
        inventore!
      </div>

      {/* followers and following */}
      {followers.isLoading && following.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex gap-5">
          <Button>Followers &nbsp; {followers.data.length}</Button>
          <Button>Following &nbsp; {following.data.length}</Button>
        </div>
      )}
    </div>
  );
};

export default TabAbout;
