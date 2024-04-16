import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import UserList from "@/components/ui/UserList";
import { AlertCircle } from "lucide-react";
import UserCardSkeleton from "./UserCardSkeleton";
import { userSlice } from "@/store/userSlice";
import Error from "./Error";

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
  const error = profileFollowing.error || currentUserFollowing.error;
  if (error)
    return (
      <Error
        message={
          error?.response?.data || error?.message || "something went wrong"
        }
      />
    );

  const isLoading =
    profileFollowing.isLoading || currentUserFollowing.isLoading;

  return (
    <div>
      <div className="flex items-center gap-3 mb-10 text-3xl font-semibold">
        <div>Following</div>
        <div>{profileFollowing.data?.following?.length}</div>
      </div>
      {isLoading ? (
        <UserCardSkeleton />
      ) : (
        <div className="w-[400px]">
          <UserList
            profileUser={profileFollowing.data?.following}
            currentUser={
              isAuthenticated ? currentUserFollowing?.data?.following : []
            }
          />
        </div>
      )}
    </div>
  );
};

export default UserFollowing;
