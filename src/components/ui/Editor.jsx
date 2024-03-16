import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { userSlice } from "@/store/userSlice";

const Editor = ({ newBlog, setNewBlog }) => {
  // const { newBlog, setNewBlog } = userSlice();
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "background",
    "size",
    "font",
    "code-block",
  ];

  const quillRef = useRef(null);

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={newBlog.content}
      onChange={(value) => setNewBlog("content", value)}
      ref={quillRef}
      className=" size-full"
    />
  );
};

export default Editor;
