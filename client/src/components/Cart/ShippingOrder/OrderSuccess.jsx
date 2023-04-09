import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <>
      <div>
        <CheckCircleIcon />
        <Typography>Your Order has been Placed successfully </Typography>
        <Link to="/dashboard/myorders">View Orders</Link>
      </div>
    </>
  );
};

export default OrderSuccess;
