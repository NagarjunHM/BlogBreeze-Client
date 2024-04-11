import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import BlogCardSkeleton from "@/components/ui/BlogCardSkeleton";
import { AlertCircle } from "lucide-react";
import BlogList from "@/components/ui/BlogList";
import FeaturedTopic from "@/components/ui/FeaturedTopic";
import FeaturedPeople from "@/components/ui/FeaturedPeople";

const HomePage = () => {
  const instance = useAxios();
  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await instance.get("/blogs");
      console.log(response);
      return response.data;
    },
  });

  // loading
  if (isLoading)
    return (
      <div className="flex flex-wrap gap-5 m-10">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
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
    <div className="flex items-start gap-5 m-10 justify-evenly">
      <div className="flex-1 h-screen">
        <BlogList data={data} />
      </div>
      <div className="sticky hidden gap-5 flex-0 top-20 lg:block ">
        <div className="mb-10">
          <FeaturedTopic />
        </div>
        <FeaturedPeople />
      </div>
    </div>
  );
};

export default HomePage;
