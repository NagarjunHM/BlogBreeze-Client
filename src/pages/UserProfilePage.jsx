import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabAbout from "@/components/ui/TabAbout";
import TabList from "@/components/ui/TabList";
import UserFollowers from "../components/ui/UserFollowers";
import UserFollowing from "../components/ui/UserFollowing";

const UserProfilePage = () => {
  return (
    <div className="m-10">
      <div className="my-10 text-5xl font-semibold">Profile</div>
      <div className="flex flex-col lg:flex-row">
        {/* user about */}
        <div className="w-[300px] flex-0">
          <TabAbout />
        </div>

        {/* user tabs */}
        <div className="flex-1 mt-10 lg:m-0">
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
    </div>
  );
};

export default UserProfilePage;
