import React, { useEffect, useState } from "react";
import { userSlice } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = userSlice();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      if (!isAuthenticated) {
        navigate("/login");
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]);

  return <>{loading ? null : children}</>;
};

export default ProtectedRoute;
