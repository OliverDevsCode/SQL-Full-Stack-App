// PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');
  // If we have a token, render whatever child route was requested
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
