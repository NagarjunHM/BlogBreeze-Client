import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import BlogList from "@/components/ui/BlogList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import BlogCardSkeleton from "@/components/ui/BlogCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { userSlice } from "@/store/userSlice";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "@/main";
import BlogHorizontalCard from "@/components/ui/BlogHoriontalSkeleton";
import UserList from "@/components/ui/UserList";
import UserCardSkeleton from "@/components/ui/UserCardSkeleton";
import Error from "@/components/ui/Error";

const TagDetailPage = () => {
  const instance = useAxios();
  const { id, isAuthenticated, token, name } = userSlice();
  const { tagId } = useParams();
  const { toast } = useToast();

  // query function to fetch tag details
  const tagDetails = useQuery({
    queryKey: ["tags", tagId],
    queryFn: async () => {
      const response = await instance.get(`/blogs/tag/${tagId}`);
      console.log(response.data);
      return response.data;
    },
  });

  // query function to fetch user details
  const userDetails = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await instance.get(`/users/${id}`);
      return response.data;
    },
    enabled: isAuthenticated,
  });

  // mutation function to follow tag
  const followTag = useMutation({
    mutationFn: () =>
      instance.post(
        `tags/follow-tag/${tagId}`,
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
      const previousUserData = queryClient.getQueryData(["users", id]);
      const previousTagDetails = queryClient.getQueryData(["tags", tagId]);

      queryClient.setQueryData(["users", id], (prev) => {
        if (prev) {
          return {
            ...prev,
            tagsFollowing: [...prev.tagsFollowing, { _id: tagId }],
          };
        }
        return prev;
      });

      queryClient.setQueryData(["tags", tagId], (prev) => {
        if (prev) {
          return {
            ...prev,
            tag: {
              ...prev.tag,
              followers: [...prev.tag.followers, { _id: id, name }],
            },
          };
        }
        return prev;
      });
      return { previousUserData, previousTagDetails };
    },

    onSettled: async () => {
      await queryClient.refetchQueries(["tags", tagId]);
      await queryClient.refetchQueries(["users", id]);
    },
  });

  // mutation function to unfollow tag
  const unFollowTag = useMutation({
    mutationFn: () =>
      instance.delete(`tags/unfollow-tag/${tagId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data || error.message || "something went wrong",
      });
    },
    onMutate: () => {
      // Optimistically update the local cache for both user and tag
      const previousUserData = queryClient.getQueryData(["users", id]);
      const previousTagDetails = queryClient.getQueryData(["tags", tagId]);

      queryClient.setQueryData(["users", id], (prev) => {
        if (prev) {
          return {
            ...prev,
            tagsFollowing: prev.tagsFollowing.filter(
              (tag) => tag._id !== tagId
            ),
          };
        }
        return prev;
      });

      queryClient.setQueryData(["tags", tagId], (prev) => {
        if (prev) {
          return {
            ...prev,
            tag: {
              ...prev.tag,
              followers: prev.tag.followers.filter(
                (follower) => follower._id !== id
              ),
            },
          };
        }
        return prev;
      });

      return { previousUserData, previousTagDetails };
    },
    onSettled: async () => {
      await queryClient.refetchQueries(["tags", tagId]);
      await queryClient.refetchQueries(["users", id]);
    },
  });

  const handleFollowTag = () => {
    if (isAuthenticated) followTag.mutate();
  };

  const handleUnfollowTag = () => {
    if (isAuthenticated) unFollowTag.mutate();
  };

  if (tagDetails.error) {
    return (
      <Error
        message={
          tagDetails.error?.response?.data ||
          tagDetails.error?.message ||
          "something went wrong"
        }
      />
    );
  }

  if (userDetails.error) {
    return (
      <Error
        message={
          userDetails.error?.response?.data ||
          userDetails.error?.message ||
          "something went wrong"
        }
      />
    );
  }

  return (
    <div className="m-10">
      {/* on loading skeleton */}
      <div>
        <div className="mb-10 text-5xl font-semibold">Tag</div>
        <div className="flex flex-col lg:flex-row">
          {tagDetails.isLoading || userDetails.isLoading ? (
            <div className="w-[300px]">
              <Skeleton className="h-[40px] w-[200px] mb-5" />
              <div className="flex gap-5 mb-10">
                <Skeleton className="h-[25px] w-[100px] " />
                <Skeleton className="h-[25px] w-[100px]" />
              </div>
            </div>
          ) : (
            <div className="w-[300px] flex-0">
              <div className="flex items-baseline gap-3 mb-3 ">
                <div className="text-3xl font-semibold">
                  {tagDetails.data.tag.name[0].toUpperCase() +
                    tagDetails.data?.tag.name.slice(1)}
                </div>

                <div>
                  {userDetails?.data?.tagsFollowing?.find(
                    (tag) => tag._id === tagId
                  ) ? (
                    <div
                      onClick={handleUnfollowTag}
                      className="font-semibold text-green-600 cursor-pointer hover:underline"
                    >
                      Following
                    </div>
                  ) : (
                    <div
                      onClick={handleFollowTag}
                      className="font-semibold text-green-600 cursor-pointer hover:underline"
                    >
                      Follow
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-5 mb-10">
                <div className="font-semibold text-muted-foreground">
                  Stories&nbsp;{tagDetails?.data?.blog?.length}
                </div>
                <div className="font-semibold text-muted-foreground">
                  Followers&nbsp;{tagDetails?.data?.tag?.followers?.length}
                </div>
              </div>
            </div>
          )}

          {/* <BlogList data={tagDetails?.data.blog} /> */}

          <div className="flex-1">
            <Tabs defaultValue="stories" className="mb-10">
              <TabsList>
                <TabsTrigger value="stories">Stories</TabsTrigger>
                <TabsTrigger value="followers">Followers</TabsTrigger>
              </TabsList>
              <TabsContent value="stories">
                <div className="mb-10 text-3xl font-semibold">Stories</div>
                {tagDetails.isLoading || userDetails.isLoading ? (
                  <div className="flex flex-col gap-5">
                    <BlogHorizontalCard />
                    <BlogHorizontalCard />
                  </div>
                ) : (
                  <BlogList data={tagDetails?.data.blog} />
                )}
              </TabsContent>
              <TabsContent value="followers">
                <div className="w-[400px]">
                  <div className="mb-10 text-3xl font-semibold">Followers</div>
                  {tagDetails.isLoading || userDetails.isLoading ? (
                    <UserCardSkeleton />
                  ) : (
                    <UserList
                      profileUser={tagDetails?.data?.tag?.followers}
                      currentUser={
                        isAuthenticated ? userDetails?.data?.following : []
                      }
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagDetailPage;
