import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    if (user.role === "student") {
      return <Navigate to="/student-dashboard" />;
    }

    if (user.role === "instructor") {
      return <Navigate to="/instructor-dashboard" />;
    }

    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    }
  }

  return children;
}

export default ProtectedRoute;