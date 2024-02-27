import React from "react";

import Hero from "@/components/ui/Hero";
import BlogCard from "@/components/ui/BlogCard";
import DiscoverTopic from "@/components/ui/DiscoverTopic";

const Landing = () => {
  return (
    <>
      <div className="p-10 ">
        <Hero />
      </div>
      <div className="flex flex-row items-start justify-center p-5 mt-5 gap-14">
        <div className="flex flex-col gap-5 lg:border-r">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
        <div className="sticky top-[72px] hidden lg:flex ">
          <DiscoverTopic />
        </div>
      </div>
    </>
  );
};

export default Landing;
