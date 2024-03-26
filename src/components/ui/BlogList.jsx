import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ data }) => {
  if (data.length === 0)
    return (
      <div className="flex gap-2 text-xl underline cursor-default">
        No blogs found
      </div>
    );
  return (
    <div className="flex flex-wrap items-stretch h-[400px] gap-5">
      {data.map((data) => (
        <div key={data._id}>
          <BlogCard data={data} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
