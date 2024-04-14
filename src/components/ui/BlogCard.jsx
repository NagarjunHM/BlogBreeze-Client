import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/DateFormatter";
import { MessageCircleMore, Share2, Bookmark } from "lucide-react";
// import { userSlice } from "@/store/userSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { Badge } from "./badge";

const BlogCard = ({ data }) => {
  const {
    title,
    description,
    user,
    likes,
    comments,
    picture,
    createdAt,
    _id,
    tag,
  } = data;

  // function to format date
  const date = formatDate(createdAt);

  return (
    <div className="flex flex-col  bg-white p-4 space-y-3 border shadow overflow-hidden h-full self-stretch   rounded-lg  w-[320px]">
      {/* card header */}
      <div className="flex space-x-4 ">
        <Avatar>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>{data.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-0.5">
          <Link
            to={`/users/${data.user._id}`}
            className="text-sm font-semibold"
          >
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
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      <div>
        <Badge tagId={tag._id}>{tag.name}</Badge>
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
          <div type="button" className="flex items-center p-1 space-x-1.5">
            <MessageCircleMore className="w-5 h-5" />
            <span>{comments.length}</span>
          </div>

          <div type="button" className="flex items-center p-1 space-x-1.5">
            {/* <ThumbsUp className="w-5 h-5" /> */}
            <IoMdHeartEmpty size="1.5em" />
            <span>{likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
