import React from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { userSlice } from "@/store/userSlice";

export default function MarkDownEditor() {
  const { newBlog, setNewBlog } = userSlice();

  return (
    <MarkdownEditor
      value={newBlog.content}
      height={300}
      onChange={(value) => setNewBlog("content", value)}
    />
  );
}
