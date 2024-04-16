import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import BlogHorizontalCard from "./BlogHoriontalSkeleton";
import { AlertCircle } from "lucide-react";
import BlogList from "@/components/ui/BlogList";

const PublicHome = () => {
  const instance = useAxios();
  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await instance.get("/blogs");
      console.log(response);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        <BlogHorizontalCard />
        <BlogHorizontalCard />
      </div>
    );
  }

  // error
  if (error)
    return (
      <div className="flex gap-4 text-red-600 space-y-1.5 items-end m-5">
        <AlertCircle />
        <span className="underline">
          {error.response?.data || error?.message || "something went wrong"}
        </span>
      </div>
    );

  return (
    <div>
      <BlogList data={data} />
    </div>
  );
};

export default PublicHome;
