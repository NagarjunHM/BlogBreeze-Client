import React from "react";
import { userSlice } from "@/store/userSlice";
import AuthHome from "@/components/ui/AuthHome";
import PublicHome from "@/components/ui/PublicHome";

const AuthCheck = () => {
  const { isAuthenticated } = userSlice();
  return isAuthenticated ? <AuthHome /> : <PublicHome />;
};

export default AuthCheck;
