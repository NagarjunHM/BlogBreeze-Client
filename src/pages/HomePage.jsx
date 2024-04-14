import React from "react";
import { Outlet } from "react-router-dom";
import FeaturedTopic from "@/components/ui/FeaturedTopic";
import FeaturedPeople from "@/components/ui/FeaturedPeople";

const HomePage = () => {
  return (
    <div className="">
      <div className="grid gap-6 m-5 lg:grid-cols-12 lg:gap-10">
        <div className=" lg:col-span-9">
          <Outlet />
        </div>
        <div className="hidden lg:block lg:col-span-3">
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
