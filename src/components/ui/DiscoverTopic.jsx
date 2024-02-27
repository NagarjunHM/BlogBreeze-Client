import React from "react";
import { Badge } from "./badge";
import { Button } from "./button";

const DiscoverTopic = () => {
  return (
    <div className="max-w-[400px] flex flex-col gap-5">
      <div className="text-xl font-bold">
        Discover more of what matters to you
      </div>
      <div className="flex flex-wrap gap-5">
        <Badge>Education</Badge>
        <Badge>Motivation</Badge>
        <Badge>Technology</Badge>
        <Badge>self</Badge>
        <Badge>self</Badge>
        <Badge>Politices</Badge>
        <Badge>Machine Learning</Badge>
      </div>
      <div>
        <Button variant="secondary">See more topics</Button>
      </div>
    </div>
  );
};

export default DiscoverTopic;
