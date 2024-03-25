import React from "react";
import { Skeleton } from "./skeleton";

const UserProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 w-[300px]">
      <Skeleton className="w-40 h-40 rounded-full" />
      <Skeleton className="w-[1/2] h-6 " />
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-2/4 h-4" />
        <Skeleton className="w-1/4 h-4" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="w-[112px] h-[40px] " />
        <Skeleton className="w-[112px] h-[40px] " />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
