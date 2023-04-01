import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        // width: 280,
      }}
    >
      <Sidebar />
      <Outlet />
    </Box>
  );
};

export default Dashboard;
