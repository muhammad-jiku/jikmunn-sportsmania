import React from 'react';
//  external import
import { Navigate } from 'react-router-dom';

const RequiredAdmin = ({ user, children }) => {
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RequiredAdmin;
