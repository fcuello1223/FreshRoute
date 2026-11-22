import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Loading from "./Loading";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
