import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill.css";
import useStore from "@/store/useStore";

const Editor = () => {
  const { newBlog, setNewBlog } = useStore();
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
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
    "align",
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
      value={newBlog.code}
      onChange={(value) => setNewBlog("code", value)}
      ref={quillRef}
      className=" size-full"
    />
  );
};

export default Editor;
