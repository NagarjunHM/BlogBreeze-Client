import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="h-[57px] flex items-center  shadow justify-between px-10 sticky top-0 backdrop-blur-xl border-b-2 border-black z-20">
      <div className="text-3xl tracking-tight cursor-pointer">
        <Link to="/">BlogBreeze</Link>
      </div>
    </div>
  );
};

export default NavBar;
