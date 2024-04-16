import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import UserList from "@/components/ui/UserList";
import Error from "./Error";
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
      console.log(response.data);
      return response?.data;
    },
    enabled: isAuthenticated,
  });

  // error
  const error = profileFollowers.error || currentUserFollowing.error;

  if (error) {
    return (
      <Error
        message={
          error?.response?.data || error?.message || "something went wrong"
        }
      />
    );
  }
  const isLoading =
    profileFollowers.isLoading || currentUserFollowing.isLoading;

  return (
    <div>
      <div className="flex gap-3 mb-10 text-3xl font-semibold ">
        <div>Followers</div>
        <div>{profileFollowers.data?.followers?.length}</div>
      </div>
      {isLoading ? (
        <UserCardSkeleton />
      ) : (
        <div className="w-[400px]">
          <UserList
            profileUser={profileFollowers.data?.followers}
            currentUser={
              isAuthenticated ? currentUserFollowing?.data?.following : []
            }
          />
        </div>
      )}
    </div>
  );
};

export default UserFollowers;
