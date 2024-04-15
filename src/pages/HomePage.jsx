import React from "react";
import { Outlet } from "react-router-dom";
import FeaturedTopic from "@/components/ui/FeaturedTopic";
import FeaturedPeople from "@/components/ui/FeaturedPeople";

const HomePage = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-6 m-10 md:grid-cols-12 md:gap-10">
        <div className="col-span-1 md:col-span-9">
          <Outlet />
        </div>
        <div className="hidden md:block md:col-span-3">
          <div className="flex flex-col gap-5">
            <FeaturedPeople />
            <FeaturedTopic />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
