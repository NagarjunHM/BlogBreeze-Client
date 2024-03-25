import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import UserList from "@/components/ui/UserList";

const UserFollowing = () => {
  const { usersId } = useParams();
  const instance = useAxios();

  const { data, error, isLoading } = useQuery({
    queryKey: ["following", usersId],
    queryFn: async () => {
      const response = await instance.get(`users/${usersId}/following`);
      return response?.data;
    },
  });

  if (error) return <div>Error</div>;

  if (isLoading) return <div>Loading</div>;

  return (
    <div>
      <div className="mb-10 text-5xl font-semibold">
        {data?.following?.length}&nbsp;Following
      </div>
      <UserList data={data.following} />
    </div>
  );
};

export default UserFollowing;
