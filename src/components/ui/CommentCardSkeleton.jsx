import React from "react";
import { Skeleton } from "./skeleton";

const CommentCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-5">
        <Skeleton className="w-10 h-10 rounded-full " />
        <Skeleton className="w-32 h-5" />
      </div>
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-3/4 h-5" />
    </div>
  );
};

export default CommentCardSkeleton;
