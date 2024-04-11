import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AllTopics = () => {
  const instance = useAxios();

  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await instance.get("/tags");
      return response.data;
    },
  });

  if (isLoading) return <div className="m-10">...Loading</div>;

  if (error) return <div>{error}</div>;
  return (
    <div className="flex justify-center m-10">
      <div className="flex flex-col w-[800px] items-center">
        <div className="mb-10 text-5xl font-semibold text-center">
          Explore topic
        </div>

        <div className="w-full mb-10">
          <div className="grid gap-1.5">
            <Label htmlFor="description">Search</Label>
            <Input
              type="search"
              placeholder="Search tag"
              id="search"
              name="search"
              // value={newBlog.description}
              // onChange={handleInput}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-5 mb-10 ">
          {data.map((tag) => (
            <Badge className="px-5 py-2 text-md" tagId={tag._id} key={tag._id}>
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTopics;
