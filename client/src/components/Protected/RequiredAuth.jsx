import React from 'react';
//  external imports
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
//  internal import
import { Loader } from '../Shared';

const RequiredAuth = ({ children }) => {
  const location = useLocation();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAuth;
