import React from "react";
import { Card, CardTitle, CardDescription, CardFooter } from "./card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const BlogCard = ({ data }) => {
  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

  const date = formatDate(data.createdAt);
  return (
    <>
      {/*<!-- Component: Horizontal card--> */}
      <Card className="flex flex-row items-center gap-5 p-3 mb-5 overflow-hidden border-none shadow-none max-w-[700px]">
        {/*  <!-- Body--> */}
        <div className="flex flex-col flex-1 gap-2 ">
          <div className="flex flex-row items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle className="text-sm">{data?.name}</CardTitle>
          </div>
          <CardTitle className="text-xl cursor-pointer">
            <Link>{data?.title}</Link>
          </CardTitle>
          <CardDescription className="hidden sm:flex ">
            {data?.description}
          </CardDescription>
          <div className="flex justify-between">
            <div className="flex flex-row gap-5">
              <p className="text-sm text-muted-foreground">{date}</p>
              <Badge variant="secondary">Self</Badge>
            </div>
            {/* <FaBookmark /> */}
            <FaRegBookmark className="cursor-pointer" />
          </div>
        </div>

        <figure className="w-[160px] flex-1.5 ">
          <img
            src={`http://localhost:5000/${data?.picture}`}
            alt="card image"
            className="object-cover aspect-auto"
          />
        </figure>
      </Card>
      {/*<!-- End Horizontal card--> */}
    </>
  );
};

export default BlogCard;
