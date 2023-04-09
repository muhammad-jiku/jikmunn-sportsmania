import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <>
      <Box>
        <CheckCircleIcon />
        <Typography>Your Order has been Placed successfully </Typography>
        <Link to="/dashboard/myorders">View Orders</Link>
      </Box>
    </>
  );
};

export default OrderSuccess;
