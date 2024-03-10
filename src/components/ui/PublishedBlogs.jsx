import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import configureAxios from "@/hooks/configureAxios";
import useStore from "@/store/useStore";
import BlogSkeleton from "./BlogSkeleton";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PublishedBlogs = () => {
  const instance = configureAxios();
  const { id, token } = useStore();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`/blog/${id}?published=true`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted) {
          setData(res.data);
        }
      } catch (err) {
        console.log(err);
        setError(err.response?.data || err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return (
      <>
        <BlogSkeleton />
        &nbsp;
        <BlogSkeleton />
      </>
    );

  if (error)
    return (
      <div>
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );

  return (
    <>
      {data.length > 0 ? (
        data.map((item) => <BlogCard key={item._id} data={item} />)
      ) : (
        <div>
          No blogs found. Click{" "}
          <Link to="/write">
            <span className="font-semibold border-b border-black cursor-pointer">
              here
            </span>{" "}
          </Link>
          to create one.
        </div>
      )}
    </>
  );
};

export default PublishedBlogs;
