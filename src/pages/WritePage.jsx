// Add necessary imports
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Editor from "@/components/ui/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useStore from "@/store/useStore";
// import { createNewBlogApi } from "@/api_layers/blogApi";
import configureAxios from "@/hooks/configureAxios";
import InfiniteProgressBar from "@/components/ui/InfiniteProgressBar";

const WritePage = () => {
  const instance = configureAxios();
  const [loading, setLoading] = useState(false);

  const { newBlog, setNewBlog, token, resetNewBlog } = useStore();
  const [errors, setErrors] = useState({});

  // onchange function
  const handleInput = (e) => {
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files[0] : e.target.value;

    // Validate file type for the 'picture' input
    if (type === "file" && value) {
      const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!allowedImageTypes.includes(value.type)) {
        alert("Please select a valid image file (JPEG, PNG, or GIF).");
        e.target.value = null; // Clear the file input
        return;
      }
    }

    setNewBlog(name, value);
  };

  // function to validate the blog form
  const validateForm = () => {
    let errors = {};

    if (!newBlog.title || newBlog.title.trim() === "") {
      errors.title = "Blog title cannot be empty";
    }

    setErrors(errors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(errors).length === 0;
  };

  // function to handle blog submission
  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const response = await instance.post("/blog/newBlog", newBlog, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.status === 201) {
          resetNewBlog();
          setErrors("");
        }
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? <InfiniteProgressBar /> : <></>}
      <div className="m-2 md:m-10">
        <form onSubmit={handleBlogSubmit}>
          <div className="m-5 grid gap-1.5">
            <Label htmlFor="title">Blog title</Label>
            <Textarea
              placeholder="Title for your blog."
              id="title"
              className="w-full"
              name="title"
              value={newBlog.title}
              onChange={handleInput}
            />
            {errors.title ? (
              <li className="text-sm text-destructive">{errors.title}</li>
            ) : (
              <></>
            )}
          </div>

          <div className="m-5 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Cover picture</Label>
            <Input
              id="picture"
              name="picture"
              type="file"
              onChange={handleInput}
            />
          </div>

          <div className="m-5 grid gap-1.5">
            <Label htmlFor="description">description</Label>
            <Textarea
              placeholder="Description of your blog."
              id="description"
              name="description"
              className="w-full"
              value={newBlog.description}
              onChange={handleInput}
            />
          </div>

          <div className="relative m-5 ">
            <Editor className="w-full" />
            {errors.content ? (
              <li className="text-sm text-destructive">{errors.content}</li>
            ) : (
              <></>
            )}
          </div>

          <div className="m-5">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WritePage;
