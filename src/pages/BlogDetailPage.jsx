import React from "react";
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

const BlogDetailPage = () => {
  const instance = useAxios();
  const { toast } = useToast();
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { id, token } = userSlice();

  // fetching the blog details
  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs", blogId],
    queryFn: async () => {
      const response = await instance.get(`/blogs/${blogId}`);
      console.log(response.data);
      return response.data;
    },
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

    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["blogs", blogId],
      });

      toast({
        title: "blog liked",
      });
    },

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
  });

  const unLikeBlog = useMutation({
    mutationFn: () =>
      instance.delete(`/blogs/${blogId}/unlike`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["blogs", blogId],
      });

      toast({
        title: "blog unliked",
      });
    },
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
  });

  // handle blog delete function
  const handleDelete = () => {
    deleteBlog.mutate();
  };

  // handle like
  const handleLike = () => {
    likeBlog.mutate();
  };

  // handle unlike
  const handleUnlike = () => {
    unLikeBlog.mutate();
  };

  if (isLoading) return <BloagDetailSkeleton />;

  // error
  if (error)
    return (
      <div className="flex  gap-4 text-red-600 space-y-1.5 items-end m-5">
        <AlertCircle />
        <span className="underline">{error.response || error.message}</span>
      </div>
    );

  const date = formatDate(data?.createdAt);

  return (
    <>
      {deleteBlog.isPending && <InfiniteProgressBar />}
      <div className="flex justify-center mx-5 mt-10 mb-10 lg:mx-0">
        <div className="w-[800px] overflow-hidden">
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
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-0.5">
                <Link
                  to={`/users/${data.user._id}`}
                  className="text-sm font-semibold"
                >
                  {data.user.name}
                </Link>
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
              >
                <Share2 />
              </button>
              <button
                aria-label="Bookmark this post"
                type="button"
                className="p-2"
              >
                <Bookmark />
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
                  <IoMdHeart size="1.5em" />
                  <span>{data.likes.length}</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="flex items-center p-1 space-x-1.5 "
                  onClick={handleLike}
                >
                  <IoMdHeartEmpty size="1.5em" />{" "}
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
