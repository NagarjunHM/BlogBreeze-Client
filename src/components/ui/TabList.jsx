import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import BlogList from "./BlogList";
import { useQuery } from "@tanstack/react-query";
import BlogHorizontalCard from "./BlogHoriontalSkeleton";
import Error from "./Error";

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

  // error

  if (error) {
    return (
      <Error
        message={
          error?.response?.data || error?.message || "something went wrong"
        }
      />
    );
  }

  return (
    <div>
      <div className="mb-10 text-3xl font-semibold">Stories</div>
      {isLoading ? (
        <div className="flex flex-col gap-5">
          <BlogHorizontalCard />
          <BlogHorizontalCard />
        </div>
      ) : (
        <BlogList data={data} />
      )}
    </div>
  );
};

export default TabList;
