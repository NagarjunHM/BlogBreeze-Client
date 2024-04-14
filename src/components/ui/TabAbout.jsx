import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UserProfileSkeleton from "./UserProfileSkeleton";
import { userSlice } from "@/store/userSlice";
import { queryClient } from "@/main";
import { useToast } from "./use-toast";
// import EditUserDetails from "./EditUserDetails";

const TabAbout = () => {
  const instance = useAxios();
  const { usersId } = useParams();
  const { toast } = useToast();
  const { isAuthenticated, id, token, name } = userSlice();

  // fetch basic user info
  const user = useQuery({
    queryKey: ["users", usersId],
    queryFn: async () => {
      const response = await instance.get(`/users/${usersId}`);
      return response.data;
    },
  });

  // fetch user's followers
  const userFollowers = useQuery({
    queryKey: ["followers", usersId],
    queryFn: async () => {
      const response = await instance.get(`users/${usersId}/followers`);
      return response.data;
    },
  });

  // fetch user's following
  const userFollowing = useQuery({
    queryKey: ["following", usersId],
    queryFn: async () => {
      const response = await instance.get(`users/${usersId}/following`);
      return response.data;
    },
  });

  // mutation function to unfollow
  const unFollowUser = useMutation({
    mutationFn: () =>
      instance.delete(`users/${usersId}/unfollow`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data || error.message || "something went wrong",
      });
    },
    onMutate: () => {
      // Optimistically update the local cache
      queryClient.setQueryData(["followers", usersId], (prev) => {
        if (prev) {
          return {
            ...prev,
            followers: prev.followers.filter((author) => author._id !== id),
          };
        }
        return prev;
      });
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["followers", user?.data._id],
      });
    },
  });

  // mutation function to follow
  const followUser = useMutation({
    mutationFn: () =>
      instance.post(
        `users/${usersId}/follow`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data || error.message || "something went wrong",
      });
    },
    onMutate: () => {
      // Optimistically update the local cache
      queryClient.setQueryData(["followers", usersId], (prev) => {
        if (prev) {
          return {
            ...prev,
            followers: [...prev.followers, { _id: id, name: name }],
          };
        }
        return prev;
      });
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["followers", usersId],
      });
      queryClient.refetchQueries({
        queryKey: ["following", usersId],
      });
    },
  });

  // function to unfollow user
  const handleUnfollow = () => {
    if (isAuthenticated) unFollowUser.mutate();
  };

  // function to follow user
  const handleFollow = () => {
    if (isAuthenticated) followUser.mutate();
  };

  // loading
  if (user.isLoading || userFollowers.isLoading || userFollowing.isLoading)
    return <UserProfileSkeleton />;

  return (
    <div className="flex flex-col ">
      {/* avatar */}
      <div className="mb-5">
        <Avatar className="w-40 h-40">
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback className="text-7xl">
            {user.data.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
      {/* name */}
      <div className="flex items-baseline gap-3">
        <div className="mb-3 text-3xl font-semibold">{user.data.name}</div>

        {/* follow unfollow button */}
        {/* {isAuthenticated && user.data._id === id && <EditUserDetails />} */}

        {isAuthenticated &&
          user.data._id !== id &&
          (userFollowers?.data?.followers?.some(
            (following) => following._id == id
          ) ? (
            <div
              className="font-semibold text-green-600 cursor-pointer hover:underline"
              onClick={handleUnfollow}
            >
              Following
            </div>
          ) : (
            <div
              className="font-semibold text-green-600 cursor-pointer hover:underline"
              onClick={handleFollow}
            >
              Follow
            </div>
          ))}
      </div>

      {/* about */}
      {user?.data?.about && (
        <div className="text-muted-foreground">{user.data.about || <></>}</div>
      )}

      {/* followers and following */}
      <div className="flex gap-5 font-semibold ">
        <div>
          <span className="mr-2">Followers</span>
          {userFollowers.data?.followers.length}
        </div>
        <div>
          <span className="mr-2">Following</span>
          {userFollowing.data?.following.length}
        </div>
      </div>
    </div>
  );
};

export default TabAbout;
