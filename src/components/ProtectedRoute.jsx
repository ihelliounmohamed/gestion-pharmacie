import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// <ProtectedRoute />                        -> any logged-in user
// <ProtectedRoute roles={["pharmacien"]} /> -> only these roles
export default function ProtectedRoute({ roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/medicaments" replace />;

  return <Outlet />;
}
