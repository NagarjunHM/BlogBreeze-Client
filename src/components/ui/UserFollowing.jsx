import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import UserList from "@/components/ui/UserList";
import { AlertCircle } from "lucide-react";
import UserCardSkeleton from "./UserCardSkeleton";
import { userSlice } from "@/store/userSlice";

const UserFollowing = () => {
  const { usersId } = useParams();
  const instance = useAxios();
  const { isAuthenticated, id } = userSlice();

  // fetch profile user's following
  const profileFollowing = useQuery({
    queryKey: ["following", usersId],
    queryFn: async () => {
      const response = await instance.get(`users/${usersId}/following`);
      return response?.data;
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

  // error
  if (profileFollowing.error || currentUserFollowing.error)
    return (
      <div className="flex  gap-4 text-red-600 space-y-1.5 items-end m-5">
        <AlertCircle />
        <span className="underline">{error.response || error.message}</span>
      </div>
    );

  const isLoading =
    profileFollowing.isLoading || currentUserFollowing.isLoading;

  return (
    <div>
      <div className="flex items-center gap-3 mb-10 text-5xl font-semibold">
        <div>Following</div>
        <div>{profileFollowing.data?.following?.length}</div>
      </div>
      {isLoading ? (
        <UserCardSkeleton />
      ) : (
        <UserList
          profileUser={profileFollowing.data?.following}
          currentUser={
            isAuthenticated ? currentUserFollowing.data?.following : []
          }
        />
      )}
    </div>
  );
};

export default UserFollowing;
