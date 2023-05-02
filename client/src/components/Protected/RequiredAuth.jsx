import React from 'react';
//  external import
import { Navigate } from 'react-router-dom';

const RequiredAuth = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequiredAuth;
