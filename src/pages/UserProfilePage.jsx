import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabAbout from "@/components/ui/TabAbout";
import TabList from "@/components/ui/TabList";

const UserProfilePage = () => {
  return (
    <div className="flex-1 mx-10 mt-10">
      <Tabs defaultValue="about" className="w-full mb-10">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <TabList />
        </TabsContent>
        <TabsContent value="about">
          <TabAbout />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;
