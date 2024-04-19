import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import Error from "@/components/ui/Error";

const AllTopics = () => {
  const instance = useAxios();
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await instance.get("/tags");
      return response.data;
    },
  });

  if (error) {
    return (
      <Error
        message={
          error?.response?.data || error?.message || "something went wrong"
        }
      />
    );
  }

  const filter = data?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex justify-center m-10">
      <div className="flex flex-col w-[800px]">
        <div className="mb-10 text-5xl font-semibold text-center">
          Explore topic
        </div>
        <div className="mb-2 text-3xl">Refine recommendations</div>
        <div className="mb-10 text-muted-foreground">
          Adjust recommendations by updating what you’re following
        </div>

        <div className="w-full mb-10">
          <div className="grid gap-1.5">
            <Label htmlFor="description">Search</Label>
            <Input
              type="search"
              placeholder="Search tag"
              id="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-5 mb-10 ">
          {isLoading ? (
            <div className="flex flex-wrap gap-5">
              <Skeleton className="h-[30px] w-[100px] rounded-full" />
              <Skeleton className="h-[30px] w-[100px] rounded-full" />
              <Skeleton className="h-[30px] w-[100px] rounded-full" />
              <Skeleton className="h-[30px] w-[100px] rounded-full" />
              <Skeleton className="h-[30px] w-[100px] rounded-full" />
              <Skeleton className="h-[30px] w-[100px] rounded-full" />
            </div>
          ) : search === "" ? (
            data.map((tag) => (
              <Badge
                className="px-4 py-1 text-md"
                tagId={tag._id}
                key={tag._id}
              >
                {tag.name}
              </Badge>
            ))
          ) : (
            filter.map((tag) => (
              <Badge
                className="px-5 py-2 text-md"
                tagId={tag._id}
                key={tag._id}
              >
                {tag.name}
              </Badge>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTopics;
