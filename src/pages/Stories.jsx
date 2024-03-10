import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DraftBlogs from "@/components/ui/DraftBlogs";
import PublishedBlogs from "@/components/ui/PublishedBlogs";
import AllBlogs from "@/components/ui/AllBlogs";

const Stories = () => {
  return (
    <div className="min-w-[700px]">
      <div className="mb-10 text-4xl">Your stories</div>
      <Tabs defaultValue="draft">
        <TabsList>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="draft">
          <DraftBlogs />
        </TabsContent>
        <TabsContent value="published">
          <PublishedBlogs />
        </TabsContent>
        <TabsContent value="all">
          <AllBlogs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Stories;
