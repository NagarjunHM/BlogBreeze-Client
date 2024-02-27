import React from "react";
import { Card, CardTitle, CardDescription, CardFooter } from "./card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const BlogCard = () => {
  return (
    <>
      {/*<!-- Component: Horizontal card--> */}
      <Card className="flex border-none  shadow-none max-w-[700px] overflow-hidden items-center flex-row p-5 gap-5">
        {/*  <!-- Body--> */}
        <div className="flex flex-col flex-1 gap-2 ">
          <div className="flex flex-row items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle className="text-sm">Name of the author lorem</CardTitle>
          </div>
          <CardTitle className="text-xl">
            Name of the Blog post goes here Name of the Blog post goes here
          </CardTitle>
          <CardDescription className="hidden sm:flex ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quis
            mollitia error doloribus libero quia dicta. Impedit blanditiis
            excepturi error neque, ea quisquam necessitatibus velit. Vero minima
            excepturi quod hic?
          </CardDescription>
          <div className="flex justify-between">
            <div className="flex flex-row gap-5">
              <p className="text-sm text-muted-foreground">Feb 2, 2023</p>
              <Badge>Self</Badge>
            </div>
            {/* <FaBookmark /> */}
            <FaRegBookmark className="cursor-pointer" />
          </div>
        </div>

        <figure className="w-[160px] flex-1.5">
          <img
            src="https://picsum.photos/id/118/800/600"
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
