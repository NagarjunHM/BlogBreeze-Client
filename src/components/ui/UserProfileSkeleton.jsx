import React from "react";
import { Skeleton } from "./skeleton";

const UserProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="w-40 h-40 rounded-full" />
      <Skeleton className="w-[300px] h-6 " />
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[700px] h-4" />
        <Skeleton className="w-[700px] h-4" />
        <Skeleton className="w-[400px] h-4" />
        <Skeleton className="w-[100px] h-4" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="w-[112px] h-[40px] " />
        <Skeleton className="w-[112px] h-[40px] " />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
