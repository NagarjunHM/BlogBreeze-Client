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
import AsyncCreatableSelect from "react-select/async-creatable";
import axios from "axios";

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
    tag: "",
  });
  let cancelToken;

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
        tag: { value: data.tag._id, label: data.tag.name } || "",
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

  // onChange function for tag
  const handleTagChange = (newValue) => {
    setBlogData((prev) => ({
      ...prev,
      tag: newValue,
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

  // onchange search function
  const promiseOptions = async (inputValue) => {
    if (cancelToken) {
      cancelToken.cancel("Previous request cancelled");
    }
    // Create a new cancel token for the current request
    cancelToken = axios.CancelToken.source();

    if (!inputValue.trim()) {
      return [];
    }
    try {
      const response = await instance.get(`/tags?tag=${inputValue}`, {
        cancelToken: cancelToken.token,
      });
      return response.data.map((tag) => ({
        value: tag._id,
        label: tag.name,
      }));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled", error.message);
      } else {
        console.log("Error", error.message);
      }
      return [];
    }
  };

  // Mutation function to create a tag
  const createTag = useMutation({
    mutationFn: async (inputValue) => {
      const response = await instance.post(
        "/tags",
        { name: inputValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      const newOption = { value: data._id, label: data.name };
      setBlogData((prev) => ({
        ...prev,
        tag: newOption,
      }));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Function to handle tag creation
  const handleCreateTag = (inputValue) => {
    createTag.mutate(inputValue);
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
    onSettled: () => {},
  });

  // Handle blog submission
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutate();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  console.log(blogData);

  return (
    <div className="m-10">
      {isPending ? <InfiniteProgressBar /> : null}
      <div>
        <form onSubmit={handleBlogSubmit} className="flex flex-col gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="title">Blog title</Label>
            <Input
              placeholder="Title for your blog"
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
              placeholder="Description of your blog"
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

          <div className="grid gap-1.5">
            <Label htmlFor="description">Tag</Label>
            <div className="max-w-sm">
              <AsyncCreatableSelect
                styles={{
                  option: (defaultStyles, state) => ({
                    ...defaultStyles,
                    maxWidth: "382px",
                    backgroundColor:
                      state.isSelected || state.isFocused ? "#F1F5F9" : "white",
                  }),
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: "#E2E8F0",
                    boxShadow: "none",
                    maxWidth: "382px",
                    fontSize: "0.875rem",
                    "&:hover": {
                      border: "1px solid #E2E8F0",
                    },
                    border: "1px solid #E2E8F0",
                    borderRadius: "0.375rem",
                  }),
                }}
                isClearable
                loadOptions={promiseOptions}
                onCreateOption={handleCreateTag}
                onChange={handleTagChange}
                value={blogData.tag}
              />
            </div>
          </div>

          <div className="relative">
            <div className="mb-1">
              <Label htmlFor="editor">Blog content</Label>
            </div>
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
