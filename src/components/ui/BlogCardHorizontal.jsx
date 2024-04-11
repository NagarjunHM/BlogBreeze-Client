import React from "react";
import { formatDate } from "@/lib/DateFormatter";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

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
    <div className="border shadow">
      <div className="container grid grid-cols-1 mx-auto md:grid-cols-12 ">
        {/* picture */}
        <div className="col-span-full md:col-span-4 md:order-1">
          {data?.picture && (
            <img
              src={`http://localhost:5000/${picture}`}
              alt="Description of the image"
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* blog detail */}
        <div className="flex flex-col p-6 col-span-full md:col-span-8 md:p-10">
          <div className="flex justify-start">
            <span className="px-1 py-1 text-xs rounded-full dark:bg-violet-600 dark:text-gray-50">
              <Badge>{tag.name}</Badge>
            </span>
          </div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="pt-2">{description}</p>
          <Link
            rel="noopener noreferrer"
            to={`/blogs/${_id}`}
            className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm hover:text-blue-600 dark:text-violet-600"
          >
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
          </Link>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>{data.user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <Link to={`/users/${data.user._id}`}>
                <span className="self-center text-sm cursor-pointer">
                  by {user.name}
                </span>
              </Link>
            </div>
            <span className="text-xs">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardHorizontal;
