import React, { useEffect, useState } from "react";
import { userSlice } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = userSlice();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      if (isAuthenticated) {
        navigate("/");
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]);

  return loading ? null : <>{children}</>;
};

export default PublicRoute;
