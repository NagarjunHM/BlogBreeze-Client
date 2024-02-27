import React from "react";

import { Button } from "./button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-7xl">
        <span className="text-yellow-400">S</span>tay curious...
      </div>
      <div className="text-muted-foreground">
        Discover stories, thinking, and expertise from writers on any topic.
      </div>
      <div>
        <Link to="/signin">
          <Button variant="secondary">Start reading</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
