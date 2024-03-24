import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/ui/NavBar";

const LayoutPage = () => {
  return (
    <div className="size-full scroll-smooth">
      <NavBar />
      <Toaster />
      <Outlet />
    </div>
  );
};

export default LayoutPage;
