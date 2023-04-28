import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <Box
      sx={{
        p: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CheckCircleIcon sx={{ mr: 1 }} />
        <Typography
          sx={{
            fontSize: {
              xs: '16px',
              md: '20px',
            },
          }}
        >
          Your Order has been Placed successfully{' '}
        </Typography>
      </Box>
      <Box sx={{ p: 2, fontSize: '20px' }}>
        <Link
          to="/dashboard/myorders"
          style={{ color: '#682404', textDecoration: 'none' }}
        >
          View Orders
        </Link>
      </Box>
    </Box>
  );
};

export default OrderSuccess;
