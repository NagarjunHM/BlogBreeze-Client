import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { userSlice } from "@/store/userSlice";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import CommentCard from "./CommentCard";

const CommentList = () => {
  const instance = useAxios();
  const { blogId } = useParams();
  const { token } = userSlice();

  const { data, error, isLoading } = useQuery({
    queryKey: ["comments", blogId],
    queryFn: async () => {
      const response = await instance.get(`/comments/${blogId}`);
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (error)
    return (
      <div className="flex  gap-4 text-red-600 space-y-1.5 items-end m-5">
        <AlertCircle />
        <span className="underline">{error.response || error.message}</span>
      </div>
    );

  console.log(data);

  if (data.length === 0) {
    return <div className="text-muted-foreground"> No comments yet</div>;
  }

  return (
    <div>
      {data.map((data) => (
        <div key={data._id}>
          <CommentCard data={data} />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
