// Add necessary imports
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Editor from "@/components/ui/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userSlice } from "@/store/userSlice";
import useAxios from "@/hooks/useAxios";
import InfiniteProgressBar from "@/components/ui/InfiniteProgressBar";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import AsyncCreatableSelect from "react-select/async-creatable";
import axios from "axios";

const Create_Blog = () => {
  const [formError, setFromError] = useState({});
  const instance = useAxios();
  const navigate = useNavigate();
  const { toast } = useToast();
  let cancelToken;
  const { newBlog, setNewBlog, token, resetNewBlog } = userSlice();

  // onchange function
  const handleInput = (e) => {
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files[0] : e.target.value;

    // Log the newBlog state to check if the file is captured correctly
    console.log("New Blog State:", { ...newBlog, [name]: value });

    // Validate file type for the 'picture' input
    if (type === "file" && value) {
      const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (!allowedImageTypes.includes(value.type)) {
        alert("Please select a valid image file (JPEG, PNG, or GIF).");
        e.target.value = null; // Clear the file input
        return;
      }
    }
    setNewBlog(name, value);
  };

  // onChange function for tag
  const handleTagChange = (newValue) => {
    setNewBlog("tag", newValue);
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

  // function to validate the blog form
  const validateForm = () => {
    let errors = {};

    if (!newBlog.title || newBlog.title.trim() === "") {
      errors.title = "Blog title cannot be empty";
    }

    setFromError(errors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(errors).length === 0;
  };

  // mutation function to insert new blog
  const { mutate, error, isPending } = useMutation({
    mutationFn: () =>
      instance.post("/blogs", newBlog, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: (res) => {
      resetNewBlog();
      toast({
        title: "Blog creation successful",
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data || error.message,
      });
    },
  });

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
      setNewBlog("tag", newOption);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // function to handle blog submission
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutate();
    }
  };

  // Function to handle tag creation
  const handleCreateTag = (inputValue) => {
    createTag.mutate(inputValue);
  };

  return (
    <div className="m-10">
      {isPending ? <InfiniteProgressBar /> : <></>}
      <div>
        <div className="mb-10 text-5xl font-semibold">Write blog</div>
        <form onSubmit={handleBlogSubmit} className="flex flex-col gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="title">Blog title</Label>
            <Input
              placeholder="Title for your blog"
              id="title"
              className="w-full"
              name="title"
              value={newBlog.title}
              onChange={handleInput}
            />
            {formError.title ? (
              <li className="text-sm text-red-600">{formError.title}</li>
            ) : (
              <></>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              placeholder="Description of your blog"
              id="description"
              name="description"
              className="w-full"
              value={newBlog.description}
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

          {newBlog.picture instanceof File && (
            <img
              src={URL.createObjectURL(newBlog.picture)}
              alt="Cover"
              className="w-44 aspect-auto"
            />
          )}
          {newBlog.picture && (
            <span className="text-gray-500">{newBlog.picture.name}</span>
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
                value={newBlog?.tag}
                name="tag"
              />
            </div>
          </div>

          <div className="relative ">
            <div className="mb-1">
              <Label htmlFor="editor">Blog content</Label>
            </div>
            <Editor
              className="w-full"
              newBlog={newBlog}
              setNewBlog={setNewBlog}
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

export default Create_Blog;
