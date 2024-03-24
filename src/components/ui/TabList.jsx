import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import BlogList from "./BlogList";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const TabList = () => {
  const instance = useAxios();
  const { usersId } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs", usersId],
    queryFn: async () => {
      const response = await instance.get(`/blogs/user/${usersId}`);
      console.log(response);
      return response.data;
    },
  });

  // loading
  if (isLoading)
    return (
      <div className="m-5">
        <BlogCardSkeleton />
      </div>
    );

  // error
  if (error)
    return (
      <div className="flex  gap-4 text-red-600 space-y-1.5 items-end m-5">
        <AlertCircle />
        <span className="underline">
          {error.response?.data || error.message}
        </span>
      </div>
    );

  return (
    <div>
      <BlogList data={data} />
    </div>
  );
};

export default TabList;
