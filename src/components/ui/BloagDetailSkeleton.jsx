import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BloagDetailSkeleton = () => {
  return (
    <div className="flex justify-center mx-5 mt-10 md:mx-0">
      <div className="max-w-[800px] w-full shadow p-5">
        <Skeleton className="w-full h-12 mb-5" />
        <Skeleton className="w-full h-5 mb-2" />
        <Skeleton className="w-2/3 h-5 mb-5" />

        <div className="flex items-center mb-5 space-x-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex ">
            <Skeleton className="h-6 w-44" />
          </div>
        </div>

        <Skeleton className="h-[500px] w-full mb-5" />

        <Skeleton className="w-full h-5 mb-2" />
        <Skeleton className="w-full h-5 mb-2" />
        <Skeleton className="w-2/3 h-5 mb-5" />

        <Skeleton className="w-full h-5 mb-2" />
        <Skeleton className="w-full h-5 mb-2" />
        <Skeleton className="w-full h-5 mb-2" />
        <Skeleton className="w-4/5 h-5 mb-2" />
        <Skeleton className="w-1/3 h-5 mb-5" />
      </div>
    </div>
  );
};

export default BloagDetailSkeleton;
