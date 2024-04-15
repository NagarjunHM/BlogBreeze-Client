import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/ui/NavBar";

const LayoutPage = () => {
  return (
    <div className="scroll-smooth">
      <div className="main">
        <div className="gradient"></div>
      </div>

      <div className="relative z-10">
        <NavBar />
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutPage;
