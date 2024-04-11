import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import UserCard from "@/components/ui/UserCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userSlice } from "@/store/userSlice";
import UserList from "@/components/ui/UserList";

const AllUsers = () => {
  const instance = useAxios();
  const { id, isAuthenticated } = userSlice();

  // fetching all users
  const allUsers = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await instance.get("/users");
      console.log(response.data);
      return response.data;
    },
  });

  // fetch logged in user's following
  const currentUserFollowing = useQuery({
    queryKey: ["following", id],
    queryFn: async () => {
      const response = await instance.get(`users/${id}/following`);
      return response?.data;
    },
    enabled: isAuthenticated,
  });

  if (allUsers.isLoading || currentUserFollowing.isLoading)
    return <div className="m-10">...Loading</div>;

  if (allUsers.error || currentUserFollowing.error) return <div>{error}</div>;

  return (
    <div className="flex justify-center m-10">
      <div className="flex flex-col w-[800px]">
        <div className="mb-10 text-5xl font-semibold text-center">
          Who to follow
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
              // value={newBlog.description}
              // onChange={handleInput}
            />
          </div>
        </div>

        {/* <div className="flex flex-col gap-5 mb-5">
          {allUsers?.data?.map((user) => (
            <div key={user._id}>
              <UserCard user={user} />
            </div>
          ))}
        </div> */}
        <UserList
          profileUser={allUsers.data}
          currentUser={
            isAuthenticated ? currentUserFollowing?.data?.following : []
          }
        />
      </div>
    </div>
  );
};

export default AllUsers;
