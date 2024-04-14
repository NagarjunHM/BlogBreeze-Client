import React from "react";
import UserCard from "./UserCard";
import { userSlice } from "@/store/userSlice";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { useToast } from "./use-toast";
import { useParams } from "react-router-dom";
import { queryClient } from "@/main";

const UserList = ({ profileUser, currentUser }) => {
  const instance = useAxios();
  const { toast } = useToast();
  // const { usersId } = useParams();
  const { id, isAuthenticated, token, name } = userSlice();

  console.log("currentUser", currentUser);

  // mutation function to follow user
  const followUser = useMutation({
    mutationFn: (user) =>
      instance.post(
        `users/${user._id}/follow`,
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
    onMutate: (user) => {
      // Optimistically update the local cache
      const previousUserData = queryClient.getQueryData(["users", id]);
      const previousFollowing = queryClient.getQueryData(["following", id]);
      queryClient.setQueryData(["following", id], (prev) => {
        if (prev) {
          return {
            ...prev,
            following: [...prev.following, { _id: user._id, name: user.name }],
          };
        }
        return prev;
      });
      queryClient.setQueryData(["users", id], (prev) => {
        if (prev) {
          return {
            ...prev,
            following: [...prev.following, user],
          };
        }
        return prev;
      });
      return { previousFollowing, previousUserData };
    },
    onSettled: async () => {
      await queryClient.refetchQueries(["followers"]);
      await queryClient.refetchQueries(["following"]);
      await queryClient.refetchQueries(["users", id]);
    },
  });

  // mutation function to unfollow user
  const unFollowUser = useMutation({
    mutationFn: (user) =>
      instance.delete(`users/${user._id}/unfollow`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data || error.message || "something went wrong",
      });
    },
    onMutate: (user) => {
      // Optimistically update the local cache
      const previousUserData = queryClient.getQueryData(["users", id]);
      const previousFollowing = queryClient.getQueryData(["following", id]);
      queryClient.setQueryData(["following", id], (prev) => {
        if (prev) {
          return {
            ...prev,
            following: prev.following.filter(
              (author) => author._id !== user._id
            ),
          };
        }
        return prev;
      });
      queryClient.setQueryData(["users", id], (prev) => {
        if (prev) {
          return {
            ...prev,
            following: prev.following.filter(
              (author) => author._id !== user._id
            ),
          };
        }
        return prev;
      });

      return { previousFollowing, previousUserData };
    },
    onSettled: async () => {
      await queryClient.refetchQueries(["followers"]);
      await queryClient.refetchQueries(["following"]);
      await queryClient.refetchQueries(["users", id]);
    },
  });

  // function to handle user unfollow
  const handleUnfollow = (user) => {
    if (isAuthenticated) followUser.mutate(user);
  };

  // function to handle user follow
  const handleFollow = (user) => {
    if (isAuthenticated) unFollowUser.mutate(user);
  };

  const isFollowing = (userId) => {
    return currentUser.some((user) => user._id === userId);
  };

  const renderFollowButton = (user) => {
    if (user?._id === id) {
      return <div className="text-sm font-bold ">You</div>;
    }
    const isUserFollowed = isFollowing(user._id);

    if (isUserFollowed) {
      return (
        <div
          className="text-sm font-bold text-green-600 cursor-pointer hover:underline"
          onClick={() => handleFollow(user)}
        >
          Following
        </div>
      );
    } else {
      return (
        <div
          className="text-sm font-bold text-green-600 cursor-pointer hover:underline"
          onClick={() => handleUnfollow(user)}
        >
          Follow
        </div>
      );
    }
  };

  if (profileUser.length === 0)
    return (
      <div className="flex gap-2 text-xl underline cursor-default">
        No users found
      </div>
    );

  return (
    <div className="flex flex-col gap-5 ">
      {profileUser.map((user, index) => (
        <div
          key={index}
          className="flex items-center justify-between max-w-[400px]"
        >
          <UserCard user={user} />
          {renderFollowButton(user)}
        </div>
      ))}
    </div>
  );
};

export default UserList;
