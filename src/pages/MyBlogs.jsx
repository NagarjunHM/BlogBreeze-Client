import React, { useEffect } from "react";
import configureAxios from "@/hooks/configureAxios";
import useStore from "@/store/useStore";
import { Button } from "@/components/ui/button";
import axios from "axios";

const MyBlogs = () => {
  const instance = configureAxios();
  const { token } = useStore();
  useEffect(() => {
    const fetchData = async () => {
      const result = await instance.get("/blog/", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(result);
    };
    fetchData();
  }, []);

  const handleRefresh = async () => {
    try {
      const result = await instance.get("/blog/", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button onClick={handleRefresh}>refresh</Button>
      <div>MyBlogs</div>
    </>
  );
};

export default MyBlogs;
