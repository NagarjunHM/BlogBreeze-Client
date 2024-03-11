import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/ui/NavBar";

const LayoutPage = () => {
  return (
    <div className="relative top-0 left-0">
      <NavBar />
      <Toaster />
      <Outlet />
    </div>
  );
};

export default LayoutPage;
