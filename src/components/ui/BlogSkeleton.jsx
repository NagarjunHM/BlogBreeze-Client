import { Skeleton } from "@/components/ui/skeleton";

const BlogSkeleton = () => {
  return (
    <div className="flex flex-row gap-4 h-[170px] max-w-[700px] items-center p-3">
      <div className="flex flex-col flex-1 gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-[40px] w-[40px] rounded-full" />
          <Skeleton className="h-[20px] w-[200px] " />
        </div>
        <Skeleton className="h-[25px] mr-20" />
        <Skeleton className="h-[18px] mr-5" />
        <Skeleton className="h-[18px] max-w-[200px]" />
      </div>
      <div className="flex-0">
        <Skeleton className="h-[100px] w-[160px]" />
      </div>
    </div>
  );
};

export default BlogSkeleton;
