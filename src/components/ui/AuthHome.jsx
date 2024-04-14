import React from "react";
import HorizontalTabSelector from "@/components/ui/HorizontalTabSelector";
import HomeList from "./HomeList";

const AuthHome = () => {
  return (
    <div>
      <div className="mb-5">
        <HorizontalTabSelector />
      </div>
      <HomeList />
    </div>
  );
};

export default AuthHome;
