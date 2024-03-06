import React, { useEffect } from "react";
import configureAxios from "@/hooks/configureAxios";

const MyBlogs = () => {
  const instance = configureAxios();

  useEffect(() => {
    const fetchData = async () => {
      const result = await instance.get("/blog/", {});
      console.log(result);
    };
    fetchData();
  }, []);

  return <div>MyBlogs</div>;
};

export default MyBlogs;
