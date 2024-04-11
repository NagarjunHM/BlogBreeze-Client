import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { Badge } from "./badge";
import { Link } from "react-router-dom";

const FeaturedTopic = () => {
  const instance = useAxios();

  const { data, error, isLoading } = useQuery({
    queryKey: ["topic"],
    queryFn: async () => {
      const response = await instance.get("/tags");
      console.log(response.data);
      return response.data;
    },
  });

  if (isLoading) return <div>...Loading</div>;

  return (
    <div className="  w-[300px]">
      <div className="mb-5 text-3xl font-semibold">Explore topic</div>
      <div className="flex flex-wrap gap-5 mb-5">
        {data.map((tag) => (
          <div key={tag._id}>
            <Badge tagId={tag._id}>{tag.name}</Badge>
          </div>
        ))}
      </div>
      <div className="font-semibold text-green-600 cursor-pointer hover:underline">
        <Link to="/tags">See more topics</Link>
      </div>
    </div>
  );
};

export default FeaturedTopic;
