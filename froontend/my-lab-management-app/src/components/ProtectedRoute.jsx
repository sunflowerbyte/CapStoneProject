import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated (e.g., has a valid token in localStorage)
  const token = localStorage.getItem('token');

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
