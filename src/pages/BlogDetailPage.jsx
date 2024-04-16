import React, { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/DateFormatter";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import BloagDetailSkeleton from "@/components/ui/BloagDetailSkeleton";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageCircleMore, Share2, Bookmark, Ellipsis } from "lucide-react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { userSlice } from "@/store/userSlice";
import { useToast } from "@/components/ui/use-toast";
import InfiniteProgressBar from "@/components/ui/InfiniteProgressBar";
import { queryClient } from "../main";
import Comment from "@/components/ui/Comment";
import Error from "@/components/ui/Error";

const BlogDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, []);

  const instance = useAxios();
  const { toast } = useToast();
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { id, token, isAuthenticated } = userSlice();

  // fetching the blog details
  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs", blogId],
    queryFn: async () => {
      const response = await instance.get(`/blogs/${blogId}`);
      return response.data;
    },
  });

  // fetching the following of the author
  const following = useQuery({
    queryKey: ["following", id],
    queryFn: async () => {
      const response = await instance.get(`/users/${id}/following`);
      return response.data;
    },
    enabled: !!id,
  });

  // handle blog Edit function
  const handleEdit = () => {
    navigate(`/edit-blog/${data._id}`);
  };

  // mutation query for blog deletion
  const deleteBlog = useMutation({
    mutationFn: () =>
      instance.delete(`/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["blogs"], exact: true });
      toast({
        title: "Blog deletion successful",
      });
      navigate("/");
    },
  });

  // mutation query for liking a blog
  const likeBlog = useMutation({
    mutationFn: () =>
      instance.post(
        `/blogs/${blogId}/like`,
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

    onMutate: async () => {
      // Optimistically update the local cache
      queryClient.setQueryData(["blogs", blogId], (prev) => {
        if (prev) {
          return {
            ...prev,

            // Simulate adding a like optimistically
            likes: [...prev.likes, { _id: id }],
          };
        }
        return prev;
      });
    },

    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["blogs", blogId],
      });
    },
  });

  // mutation query for unliking a blog
  const unLikeBlog = useMutation({
    mutationFn: () =>
      instance.delete(`/blogs/${blogId}/unlike`, {
        headers: { Authorization: `Bearer ${token}` },
      }),

    onError: () => {
      toast({
        variant: "destructive",
        title: error.response.data || error.message || "something went wrong",
      });
    },

    onMutate: () => {
      queryClient.setQueryData(["blogs", blogId], (prev) => {
        if (prev) {
          return {
            ...prev,
            likes: prev.likes.filter((likeId) => likeId._id !== id),
          };
        }
        return prev;
      });
    },

    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["blogs", blogId],
      });
    },
  });

  // mutation function to follow
  const followUser = useMutation({
    mutationFn: () =>
      instance.post(
        `/users/${data.user._id}/follow`,
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
      queryClient.setQueryData(["following", id], (prev) => {
        console.log(prev);
        if (prev) {
          return {
            ...prev,
            following: [...prev.following, { _id: data?.user?._id }],
          };
        }
        return prev;
      });
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["blogs", blogId],
      });
    },
  });

  // mutation function to unfollow
  const unFollowUser = useMutation({
    mutationFn: () =>
      instance.delete(`/users/${data.user._id}/unfollow`, {
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
      queryClient.setQueryData(["following", id], (prev) => {
        console.log(prev);
        if (prev) {
          return {
            ...prev,
            following: prev.following.filter(
              (author) => author._id !== data?.user?._id
            ),
          };
        }
        return prev;
      });
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["blogs", blogId],
      });
    },
  });

  // handle blog delete function
  const handleDelete = () => {
    deleteBlog.mutate();
  };

  // handle like
  const handleLike = () => {
    if (isAuthenticated) likeBlog.mutate();
  };

  // handle unlike
  const handleUnlike = () => {
    if (isAuthenticated) unLikeBlog.mutate();
  };

  // handle follow user
  const handleFollow = () => {
    if (isAuthenticated) followUser.mutate();
  };

  // handle unfollow user
  const handleUnfollow = () => {
    if (isAuthenticated) unFollowUser.mutate();
  };

  if (isLoading)
    return (
      <div>
        <BloagDetailSkeleton />
      </div>
    );

  // error
  if (error) {
    return (
      <Error
        message={
          error?.response?.data || error?.message || "something went wrong"
        }
      />
    );
  }

  const copyURLToClipboard = () => {
    const urlToCopy = window.location.href;

    // Using the Clipboard API to copy the URL
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        toast({
          title: "url copied",
          description: urlToCopy,
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Failed to copy URL to clipboard",
          description: err,
        });
      });
  };

  const date = formatDate(data?.createdAt);

  return (
    <>
      {deleteBlog.isPending && <InfiniteProgressBar />}
      <div className="z-10 flex justify-center pt-10 pb-10 mx-5 bg-background lg:px-0">
        <div className="w-[1000px] overflow-hidden  p-5">
          {/* blog title */}
          <div className="mb-5 text-5xl font-semibold">{data.title}</div>

          {/* blog description */}
          <div className="mb-5 text-xl text-muted-foreground">
            {data.description}
          </div>

          {/* avatar */}
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex mb-5 space-x-4">
              <Avatar>
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>{data.user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-0.5">
                <div className="flex gap-5 ">
                  <Link
                    to={`/users/${data.user._id}`}
                    className="text-sm font-semibold"
                  >
                    {data.user.name}
                  </Link>

                  {/* follow and unfollow link */}
                  {isAuthenticated && data?.user?._id !== id && (
                    <div className="text-sm font-semibold text-green-600 cursor-pointer hover:underline">
                      {following?.data?.following.some(
                        (following) => following._id == data?.user?._id
                      ) ? (
                        <div onClick={handleUnfollow}>Following</div>
                      ) : (
                        <div onClick={handleFollow}>Follow</div>
                      )}
                    </div>
                  )}
                </div>

                <span className="text-xs text-muted-foreground">{date}</span>
              </div>
            </div>

            {/* conditonally rendering the edit and delete menu icon */}
            {id === data.user._id && (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        handleEdit();
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleDelete(blogId);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex flex-wrap justify-between ">
            <div className="space-x-2">
              <button
                aria-label="Share this post"
                type="button"
                className="p-1 text-center"
                onClick={copyURLToClipboard}
              >
                <Share2 size="1.2em" />
              </button>
            </div>

            {/* thumbsup and comment */}
            <div className="flex space-x-4 ">
              <button
                type="button"
                className="flex items-center p-1 space-x-1.5"
              >
                {/* comment component */}
                <Comment blogId />
                <span>{data.comments.length}</span>
              </button>

              {data.likes.some((like) => like._id === id) ? (
                <button
                  type="button"
                  className="flex items-center p-1 space-x-1.5"
                  onClick={handleUnlike}
                >
                  <IoMdHeart size="1.2em" />
                  <span>{data.likes.length}</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="flex items-center p-1 space-x-1.5 "
                  onClick={handleLike}
                >
                  <IoMdHeartEmpty size="1.2em" />
                  <span>{data.likes.length}</span>
                </button>
              )}
            </div>
          </div>
          <Separator className="mb-5" />
          <img
            src={`http://localhost:5000/${data.picture}`}
            alt="cover image"
            className="object-cover w-full mb-5 rounded-lg "
          />

          <MarkdownEditor.Markdown source={data.content} />
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
