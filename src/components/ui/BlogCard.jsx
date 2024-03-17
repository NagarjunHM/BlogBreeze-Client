import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/DateFormatter";
import { ThumbsUp, MessageCircleMore, Share2, Bookmark } from "lucide-react";
import { userSlice } from "@/store/userSlice";
import LoginDialog from "./LoginDialog";

const BlogCard = ({ data }) => {
  const { title, description, user, likes, comments, picture, createdAt, _id } =
    data;

  const { isAuthenticated } = userSlice();

  // function to format date
  const date = formatDate(createdAt);

  console.log(data);
  return (
    <div className="flex flex-col  p-4 space-y-3 overflow-hidden h-full self-stretch shadow border-2 border-black rounded-lg  w-[320px]">
      {/* card header */}
      <div className="flex space-x-4 ">
        <Avatar>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-0.5">
          <Link to="#" className="text-sm font-semibold">
            {user.name}
          </Link>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>

      {/* card body */}
      <div className="flex-1">
        <img
          src={`http://localhost:5000/${picture}`}
          alt="cover image"
          className="object-cover w-full mb-4 rounded-lg h-44"
        />
        <Link
          to={`/blogs/${_id}`}
          className="mb-1 text-xl font-semibold transition-all duration-200 hover:underline"
        >
          {title}
        </Link>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* card footer */}
      <div className="flex flex-wrap justify-between flex-0">
        <div className="space-x-2">
          <button
            aria-label="Share this post"
            type="button"
            className="p-2 text-center"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button aria-label="Bookmark this post" type="button" className="p-2">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
        <div className="flex space-x-2 text-sm">
          <button type="button" className="flex items-center p-1 space-x-1.5">
            <MessageCircleMore className="w-5 h-5" />
            <span>{comments.length}</span>
          </button>

          <button type="button" className="flex items-center p-1 space-x-1.5">
            <ThumbsUp className="w-5 h-5" />
            <span>{likes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
