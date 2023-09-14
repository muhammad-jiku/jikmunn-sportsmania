import React from 'react';
//  external imports
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
//  internal import
import { Loader } from '../Shared';

const RequiredAdmin = ({ children }) => {
  const location = useLocation();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  if (loading) {
    return <Loader />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to='/dashboard' state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAdmin;
