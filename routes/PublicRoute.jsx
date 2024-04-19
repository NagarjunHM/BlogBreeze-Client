import React, { useEffect, useState } from "react";
import { userSlice } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, path, setPath } = userSlice();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      if (isAuthenticated) {
        if (path !== "") {
          navigate(path);
          setPath("");
        } else {
          navigate("/");
        }
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]);

  return loading ? null : <>{children}</>;
};

export default PublicRoute;
