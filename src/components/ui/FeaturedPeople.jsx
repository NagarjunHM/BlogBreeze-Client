import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const FeaturedPeople = () => {
  const instance = useAxios();

  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await instance.get("/users");
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className=" w-[300px]">
      <div className="mb-5 text-3xl font-semibold">Who to follow</div>
      <div className="flex flex-col gap-5 mb-5">
        {data?.map((user) => (
          <div key={user._id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
      <div className="font-semibold text-green-600 cursor-pointer hover:underline">
        <Link to="/users">See more people</Link>
      </div>
    </div>
  );
};

export default FeaturedPeople;
