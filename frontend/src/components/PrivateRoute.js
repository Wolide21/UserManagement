import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');
  
  // If there's no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, return the element (protected page)
  return element;
};

export default PrivateRoute;
