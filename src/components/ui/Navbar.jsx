import React from "react";
import { Button } from "./button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  return (
    <div className="h-[57px]  flex items-center justify-between px-10 sticky top-0 backdrop-blur-xl z-10">
      <div className="text-3xl font-semibold tracking-tight cursor-pointer">
        <Link to="/">BlogBreeze</Link>
      </div>
      {location.pathname === "/" ? (
        <Link to="/logger">
          <Button variant="secondary">Get Started</Button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
