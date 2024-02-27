import React from "react";

import { Button } from "./button";

const Hero = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-7xl">Stay curious...</div>
      <div className="text-muted-foreground">
        Discover stories, thinking, and expertise from writers on any topic.
      </div>
      <div>
        <Button variant="secondary">Start reading</Button>
      </div>
    </div>
  );
};

export default Hero;
