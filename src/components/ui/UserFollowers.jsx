import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import UserList from "@/components/ui/UserList";
import { AlertCircle } from "lucide-react";
import UserCardSkeleton from "./UserCardSkeleton";
import { userSlice } from "@/store/userSlice";

const UserFollowers = () => {
  const { usersId } = useParams();
  const instance = useAxios();
  const { isAuthenticated, id } = userSlice();

  // fetch profile user's followers
  const profileFollowers = useQuery({
    queryKey: ["followers", usersId],
    queryFn: async () => {
      const response = await instance.get(`users/${usersId}/followers`);
      return response?.data;
    },
  });

  // fetch logged in user's followers
  const currentUserFollowing = useQuery({
    queryKey: ["following", id],
    queryFn: async () => {
      const response = await instance.get(`users/${id}/following`);
      return response?.data;
    },
    enabled: isAuthenticated,
  });

  // error
  if (profileFollowers.error || currentUserFollowing.error)
    return (
      <div className="flex  gap-4 text-red-600 space-y-1.5 items-end m-5">
        <AlertCircle />
        <span className="underline">
          {profileFollowers?.error?.response ||
            currentUserFollowing?.error?.message}
        </span>
      </div>
    );

  const isLoading =
    profileFollowers.isLoading || currentUserFollowing.isLoading;

  return (
    <div>
      <div className="flex items-center gap-3 mb-10 text-3xl font-semibold">
        <div>Followers</div>
        <div>{profileFollowers.data?.followers?.length}</div>
      </div>
      {isLoading ? (
        <UserCardSkeleton />
      ) : (
        <UserList
          profileUser={profileFollowers.data?.followers}
          currentUser={
            isAuthenticated ? currentUserFollowing.data?.following : []
          }
        />
      )}
    </div>
  );
};

export default UserFollowers;
