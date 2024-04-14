import React, { useRef, useState, useEffect } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { userSlice } from "@/store/userSlice";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Skeleton } from "./skeleton";

const HorizontalTabSelector = () => {
  const containerRef = useRef(null);
  const instance = useAxios();
  const { id } = userSlice();
  const location = useLocation();
  const [showButtons, setShowButtons] = useState(false);
  const [searchQuery] = useSearchParams("tags");
  const tagId = searchQuery.get("tags");

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setShowButtons(
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200;
    }
  };

  // Use useQuery to fetch user data
  const user = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await instance.get(`/users/${id}`);
      return response.data;
    },
  });

  const tabs = [...(user?.data?.tagsFollowing || [])];

  if (user.isLoading)
    return (
      <div>
        <Skeleton className="w-full h-[35px]" />
      </div>
    );

  return (
    <div className="flex ">
      {showButtons && (
        <button
          className="text-muted-foreground hover:text-black"
          onClick={scrollLeft}
        >
          <MdKeyboardArrowLeft size="1.5em" />
        </button>
      )}
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hidden"
        style={scrollbarStyle}
      >
        <div className="inline-flex items-center justify-center h-10 p-1 text-muted-foreground">
          {/* for you */}
          <Link
            to="/"
            className={`min-w-28 px-3 py-1.5 text-sm text-center cursor-pointer font-medium ring-offset-background transition-all border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${
              location.pathname === "/" && location.search === ""
                ? "bg-background text-foreground border-muted-foreground"
                : ""
            }`}
          >
            For You
          </Link>

          {/* following */}
          <Link
            to="/?feeds=following"
            className={`min-w-28 px-3 py-1.5 text-sm text-center cursor-pointer font-medium ring-offset-background transition-all border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${
              location.pathname === "/" && location.search.includes("feeds")
                ? "bg-background text-foreground border-muted-foreground"
                : ""
            }`}
          >
            Following
          </Link>
          {tabs.map((tab, index) => (
            <Link
              to={`/?tags=${tab._id}`}
              key={index}
              className={`min-w-28 px-3 py-1.5 text-sm text-center cursor-pointer font-medium ring-offset-background transition-all border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${
              location.pathname === "/" &&
              location.search.includes("tags") &&
              tagId == `${tab._id}`
                ? "bg-background text-foreground border-muted-foreground"
                : ""
            }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
      {showButtons && (
        <button
          className="text-muted-foreground hover:text-black"
          onClick={scrollRight}
        >
          <MdKeyboardArrowRight size="1.5em" />
        </button>
      )}
    </div>
  );
};

const scrollbarStyle = {
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  scrollBehavior: "smooth",
};

export default HorizontalTabSelector;
