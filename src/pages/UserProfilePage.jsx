import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabAbout from "@/components/ui/TabAbout";
import TabList from "@/components/ui/TabList";
import UserFollowers from "../components/ui/UserFollowers";
import UserFollowing from "../components/ui/UserFollowing";

const UserProfilePage = () => {
  return (
    <div className="flex gap-10 m-10">
      {/* user about */}
      <div className="w-[300px] lg:block hidden">
        <TabAbout />
      </div>

      {/* user tabs */}
      <div>
        <Tabs defaultValue="stories" className="mb-10">
          <TabsList>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="stories">
            <TabList />
          </TabsContent>
          <TabsContent value="followers">
            <UserFollowers />
          </TabsContent>
          <TabsContent value="following">
            <UserFollowing />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
