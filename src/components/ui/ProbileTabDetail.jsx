import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabAbout from "./TabAbout";
import TabHome from "./TabHome";

const ProbileTabDetail = () => {
  return (
    <div className="flex-1">
      <div className="mb-10 text-5xl font-semibold">Author name</div>
      <Tabs defaultValue="home" className="w-full mb-10">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <TabHome />
        </TabsContent>
        <TabsContent value="about">
          <TabAbout />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProbileTabDetail;
