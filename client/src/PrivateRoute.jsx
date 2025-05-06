// PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.get('http://localhost:5000/api/auth/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
        console.log("JWT Token Valid ✅")
      } catch (error) {
        // Invalid or expired token
        localStorage.removeItem('authToken'); // Clean up just in case
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
