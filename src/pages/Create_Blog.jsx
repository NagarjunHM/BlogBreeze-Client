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

const Create_Blog = () => {
  const [formError, setFromError] = useState({});
  const instance = useAxios();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { newBlog, setNewBlog, token, resetNewBlog } = userSlice();

  // onchange function
  const handleInput = (e) => {
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files[0] : e.target.value;

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

  // function to handle blog submission
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutate();
    }
  };

  return (
    <div className="m-10">
      {isPending ? <InfiniteProgressBar /> : <></>}
      <div>
        <form onSubmit={handleBlogSubmit} className="flex flex-col gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="title">Blog title</Label>
            <Input
              placeholder="Title for your blog."
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
            <Label htmlFor="description">description</Label>
            <Input
              placeholder="Description of your blog."
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

          {newBlog.picture && (
            <img
              src={URL.createObjectURL(newBlog.picture)}
              alt="Cover"
              className="w-44 aspect-auto"
            />
          )}

          <div className="relative ">
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
