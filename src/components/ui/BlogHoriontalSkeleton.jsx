import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogHorizontalCard = () => {
  return (
    <>
      <div className="border rounded shadow ">
        <div className="container grid grid-cols-1 mx-auto md:grid-cols-12 ">
          {/* Placeholder for picture */}
          <div className="col-span-full md:col-span-4 md:order-1">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Placeholder for blog detail */}
          <div className="flex flex-col p-6 col-span-full md:col-span-8 ">
            {/* Placeholder for badge */}
            <div className="flex justify-start">
              <Skeleton className="w-32 h-6" />
            </div>

            {/* Placeholder for title */}
            <h1 className="pt-1 text-3xl font-semibold">
              <Skeleton className="h-8 w-96" />
            </h1>

            {/* Placeholder for description */}
            <p className="pt-2 text-muted-foreground">
              <Skeleton className="w-full h-4" count={2} />
            </p>

            {/* Placeholder for read more link */}
            <div className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm ">
              <Skeleton className="w-20 h-5" />
            </div>

            {/* Placeholder for user details and actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-4">
                {/* Placeholder for user avatar */}
                <Skeleton className="w-12 h-12 rounded-full" />

                {/* Placeholder for user name and date */}
                <div className="flex flex-col space-y-0.5">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="w-20 h-3" />
                </div>
              </div>

              {/* Placeholder for like, comment, and share actions */}
              <div className="flex space-x-2 text-sm">
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-5 w-14" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogHorizontalCard;
