import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <>
      <div className="flex flex-col max-w-[320px] p-4 space-y-3 overflow-hidden rounded-lg shadow">
        {/* card header skeleton */}
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex ">
            <Skeleton className="h-6 w-44" />
          </div>
        </div>

        {/* card body skeleton */}
        <div>
          <Skeleton className="w-full mb-4 rounded-lg h-60" />
          <Skeleton className="w-full h-5 mb-2" />
          <Skeleton className="w-2/3 h-5 mb-2" />
          <Skeleton className="w-1/3 h-5 mb-2" />
        </div>
      </div>
    </>
  );
};

export default BlogCardSkeleton;
