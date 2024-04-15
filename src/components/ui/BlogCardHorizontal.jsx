import React from "react";
import { formatDate } from "@/lib/DateFormatter";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { MessageCircleMore, Share2, Bookmark } from "lucide-react";
import { IoMdHeartEmpty } from "react-icons/io";

const BlogCardHorizontal = ({ data }) => {
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
    <div className="rounded bg-black/10">
      <div className="container grid grid-cols-1 mx-auto lg:grid-cols-12 ">
        {/* picture */}
        <div className="col-span-full lg:col-span-4 lg:order-1">
          {data?.picture && (
            <img
              src={`http://localhost:5000/${picture}`}
              alt="Description of the image"
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* blog detail */}
        <div className="flex flex-col p-6 col-span-full lg:col-span-8 ">
          {/* badge */}
          <div className="flex justify-start">
            <span className="px-1 py-1 ">
              <Badge tagId={tag._id}>{tag.name}</Badge>
            </span>
          </div>

          <h1 className="pt-1 text-3xl font-semibold">{title}</h1>
          <p className="pt-2 text-muted-foreground">{description}</p>
          <Link
            to={`/blogs/${_id}`}
            className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm "
          >
            <div className="flex items-end gap-3">
              <span>Read more</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </Link>

          {/* footer avatar */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>{data.user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-0.5">
                <Link to={`/users/${data.user._id}`}>
                  <span className="self-center text-sm cursor-pointer">
                    {user.name}
                  </span>
                </Link>
                <span className="text-xs text-muted-foreground">{date}</span>
              </div>
            </div>

            {/* like comment and share */}
            <div className="flex flex-wrap justify-between flex-0 ">
              <div className="flex space-x-2 text-sm">
                <div
                  type="button"
                  className="flex items-center p-1 space-x-1.5"
                >
                  <MessageCircleMore className="w-5 h-5" />
                  <span>{comments.length}</span>
                </div>

                <div
                  type="button"
                  className="flex items-center p-1 space-x-1.5"
                >
                  {/* <ThumbsUp className="w-5 h-5" /> */}
                  <IoMdHeartEmpty size="1.5em" />
                  <span>{likes.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardHorizontal;
