import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      if (!isAuthenticated) {
        navigate("/signin");
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]);

  return <>{loading ? null : children}</>;
};

export default ProtectedRoute;
