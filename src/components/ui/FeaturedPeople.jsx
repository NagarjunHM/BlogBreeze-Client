import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import { Skeleton } from "./skeleton";
import Error from "./Error";

const FeaturedPeople = () => {
  const instance = useAxios();

  const { data, error, isLoading } = useQuery({
    queryKey: ["users", "featured"],
    queryFn: async () => {
      const response = await instance.get("/users?featured=true");
      return response.data;
    },
  });

  if (isLoading) return <Skeleton className="w-full h-[300px]" />;

  if (error) {
    return (
      <Error
        message={
          error?.response?.data || error?.message || "something went wrong"
        }
      />
    );
  }

  return (
    <div className="py-5">
      <div className="mb-4 text-3xl font-semibold">Who to follow</div>
      <div className="flex flex-col max-w-full gap-4 overflow-x-auto">
        {data?.map((user) => (
          <div key={user._id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
      <div className="mt-4 text-green-600 cursor-pointer hover:underline">
        <Link to="/users">See more people</Link>
      </div>
    </div>
  );
};

export default FeaturedPeople;
