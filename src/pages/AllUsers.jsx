import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userSlice } from "@/store/userSlice";
import UserList from "@/components/ui/UserList";
import UserCardSkeleton from "@/components/ui/UserCardSkeleton";
import Error from "@/components/ui/Error";

const AllUsers = () => {
  const instance = useAxios();
  const { id, isAuthenticated } = userSlice();
  const [search, setSearch] = useState("");

  // fetching all users
  const allUsers = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await instance.get("/users");
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

  if (allUsers.error) {
    return (
      <Error
        message={
          allUsers.error?.response?.data ||
          allUsers.error?.message ||
          "something went wrong"
        }
      />
    );
  }

  if (currentUserFollowing.error) {
    return (
      <Error
        message={
          currentUserFollowing.error?.response?.data ||
          currentUserFollowing.error?.message ||
          "something went wrong"
        }
      />
    );
  }

  const filter = allUsers?.data?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {allUsers.isLoading || currentUserFollowing.isLoading ? (
          <UserCardSkeleton />
        ) : search === "" ? (
          <UserList
            profileUser={allUsers.data}
            currentUser={
              isAuthenticated ? currentUserFollowing?.data?.following : []
            }
          />
        ) : (
          <UserList
            profileUser={filter || []}
            currentUser={
              isAuthenticated ? currentUserFollowing?.data?.following : []
            }
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;
