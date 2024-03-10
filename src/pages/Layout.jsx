import React from "react";

import Navbar from "@/components/ui/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="m-10 md:m-20 md:mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
