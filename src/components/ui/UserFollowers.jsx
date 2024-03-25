import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import UserList from "@/components/ui/UserList";

const UserFollowers = () => {
  const { usersId } = useParams();
  const instance = useAxios();

  const { data, error, isLoading } = useQuery({
    queryKey: ["followers", usersId],
    queryFn: async () => {
      const response = await instance.get(`users/${usersId}/followers`);
      return response?.data;
    },
  });

  if (error) return <div>Error</div>;

  if (isLoading) return <div>Loading</div>;

  return (
    <div>
      <div className="mb-10 text-5xl font-semibold">
        {data?.followers?.length}&nbsp;Followers
      </div>
      <UserList data={data.followers} />
    </div>
  );
};

export default UserFollowers;
