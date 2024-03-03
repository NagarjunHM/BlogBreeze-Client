// Add necessary imports
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Editor from "@/components/ui/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useStore from "@/store/useStore";

const WritePage = () => {
  // const [newBlog, setNewBlog] = useState({});
  const { newBlog, setNewBlog } = useStore();
  const [errors, setErrors] = useState({});
  const [validForm, setValidForm] = useState(true);

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

    if (!newBlog.code || newBlog.code.trim() === "") {
      errors.code = "Blog content cannot be empty";
    }

    setErrors(errors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(errors).length === 0;
  };

  // function to handle blog submission
  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
    }
    console.log(newBlog);
  };

  return (
    <div className="m-2 md:m-10">
      <form>
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
            // value={newBlog.picture}
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
          {errors.code ? (
            <li className="text-sm text-destructive">{errors.code}</li>
          ) : (
            <></>
          )}
        </div>

        <div className="m-5">
          <Button type="submit" onClick={handleBlogSubmit}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WritePage;
