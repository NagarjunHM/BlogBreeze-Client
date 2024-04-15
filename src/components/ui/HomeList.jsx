import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { userSlice } from "@/store/userSlice";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import BlogList from "./BlogList";
import BlogHorizontalCard from "./BlogHoriontalSkeleton";

const HomeList = () => {
  const instance = useAxios();
  const { id } = userSlice();
  const location = useLocation();
  const [searchQuery] = useSearchParams("tags");
  const tagId = searchQuery.get("tags");
  let blogData;

  if (location.pathname === "/" && location.search === "") {
    blogData = useQuery({
      queryKey: ["following", "tag", id],
      queryFn: async () => {
        const response = await instance.get(`blogs/following/tags/${id}`);
        return response.data;
      },
    });
  }

  if (location.pathname === "/" && location.search.includes("feeds")) {
    blogData = useQuery({
      queryKey: ["following", "users", id],
      queryFn: async () => {
        const response = await instance.get(`/blogs/following/users/${id}`);
        return response.data;
      },
    });
  }

  if (location.pathname === "/" && location.search.includes("tags")) {
    blogData = useQuery({
      queryKey: ["tags", tagId],
      queryFn: async () => {
        const response = await instance.get(`/blogs/tag/${tagId}`);
        return response.data;
      },
    });
  }

  if (blogData.isLoading) {
    return (
      <div className="flex flex-col gap-5">
        <BlogHorizontalCard />
        <BlogHorizontalCard />
        <BlogHorizontalCard />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div>
        {<BlogList data={blogData.data?.blog || blogData.data || []} />}
      </div>
    </div>
  );
};

export default HomeList;
