import React from 'react';
//  external imports
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
//  internal import
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <Outlet />
    </Box>
  );
};

export default Dashboard;
