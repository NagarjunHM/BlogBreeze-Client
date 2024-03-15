import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import BlogCardSkeleton from "@/components/ui/BlogCardSkeleton";
import { AlertCircle } from "lucide-react";
import BlogList from "@/components/ui/BlogList";

const HomePage = () => {
  const instance = useAxios();
  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await instance.get("/blogs");
      console.log(response);
      return response;
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
    <div className="m-10">
      <BlogList data={data.data} />
    </div>
  );
};

export default HomePage;
