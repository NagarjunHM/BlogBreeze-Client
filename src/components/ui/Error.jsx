import React from "react";
import { AlertCircle } from "lucide-react";

const Error = ({ message }) => {
  return (
    <div className="flex  gap-4 text-red-600 space-y-1.5 items-end m-5">
      <AlertCircle />
      <span className="underline">{message}</span>
    </div>
  );
};

export default Error;
