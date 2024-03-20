import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/DateFormatter";
import { MdDeleteOutline } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userSlice } from "@/store/userSlice";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { useToast } from "./use-toast";
import { queryClient } from "@/main";
import InfiniteProgressBar from "./InfiniteProgressBar";

const CommentCard = ({ data }) => {
  const date = formatDate(data.createdAt);
  const { id, token } = userSlice();
  const instance = useAxios();
  const { toast } = useToast();

  const { mutate, error, isPending } = useMutation({
    mutationFn: (commentId) =>
      instance.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.refetchQueries("comments", "blogs");
      toast({
        title: "Comment deleted successful",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data || error.message,
      });
    },
  });

  //   function to delete comment
  const handleDelete = (commentId) => {
    mutate(commentId);
  };

  return (
    <>
      {isPending && <InfiniteProgressBar />}
      <div className="mb-5">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex mb-5 space-x-4">
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              <Link to="#" className="text-sm font-semibold">
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
                      // handleEdit();
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleDelete(data._id);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <div className="text-sm">{data.content}</div>
      </div>
    </>
  );
};

export default CommentCard;
