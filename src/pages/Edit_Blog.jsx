import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import EditEditor from "@/components/ui/EditEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import InfiniteProgressBar from "@/components/ui/InfiniteProgressBar";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { userSlice } from "@/store/userSlice";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Edit_Blog = () => {
  const [formError, setFormError] = useState({});
  const instance = useAxios();
  const { toast } = useToast();
  const { token } = userSlice();
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    picture: "",
    description: "",
    content: "",
  });

  // Fetch the blog data
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["blogs", blogId],
    queryFn: async () => {
      const response = await instance.get(`/blogs/${blogId}`);
      return response.data;
    },
  });

  // Handle errors
  if (error)
    return (
      <div className="flex  gap-4 text-red-600 space-y-1.5 items-end m-5">
        <AlertCircle />
        <span className="underline">{error.response || error.message}</span>
      </div>
    );

  // Set blog data on successful fetch
  useEffect(() => {
    if (isSuccess) {
      setBlogData((prevData) => ({
        ...prevData,
        title: data.title || "",
        picture: data.picture || "",
        description: data.description || "",
        content: data.content || "",
      }));
    }
  }, [data, isSuccess]);

  // Handle input change
  const handleInput = (e) => {
    const { name, value, type } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  // Validate form
  const validateForm = () => {
    let errors = {};

    if (!blogData.title.trim()) {
      errors.title = "Blog title cannot be empty";
    }

    setFormError(errors);

    return Object.keys(errors).length === 0;
  };

  // Mutation function to update the blog
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      instance.put(`/blogs/${blogId}`, blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      toast({
        title: "Blog updated successfully",
      });
      navigate(`/blogs/${blogId}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data || error.message,
      });
    },
  });

  // Handle blog submission
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutate();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="m-10">
      {isPending ? <InfiniteProgressBar /> : null}
      <div>
        <form onSubmit={handleBlogSubmit} className="flex flex-col gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="title">Blog title</Label>
            <Input
              placeholder="Title for your blog."
              id="title"
              className="w-full"
              name="title"
              value={blogData.title}
              onChange={handleInput}
            />
            {formError.title && (
              <li className="text-sm text-red-600">{formError.title}</li>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              placeholder="Description of your blog."
              id="description"
              name="description"
              className="w-full"
              value={blogData.description}
              onChange={handleInput}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Cover picture</Label>
            <Input
              id="picture"
              name="picture"
              type="file"
              onChange={handleInput}
            />
          </div>

          {blogData.picture &&
          typeof blogData.picture === "string" &&
          blogData.picture.includes("uploads") ? (
            <img
              src={`http://localhost:5000/${blogData.picture}`}
              alt="Cover "
              className="w-44 aspect-auto"
            />
          ) : (
            <img
              src={
                blogData.picture instanceof Blob
                  ? URL.createObjectURL(blogData.picture)
                  : ""
              }
              alt="Cover"
              className="w-44 aspect-auto"
            />
          )}

          <div className="relative">
            <EditEditor
              content={blogData.content}
              setContent={(value) =>
                setBlogData((prevData) => ({ ...prevData, content: value }))
              }
              className="w-full"
            />
          </div>

          <div className="ml-auto">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit_Blog;
