import React from 'react';
import { Box, Typography } from '@mui/material';
import ReviewsCard from './ReviewsCard';

const Reviews = ({ product }) => {
  console.log(product);
  return (
    <Box
      sx={{
        p: 2,
        mt: 2,
      }}
    >
      <Typography variant="h5" color="text.secondary">
        Reviews:
      </Typography>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          overflowX: 'auto',
        }}
      >
        {product?.reviews?.map((review, idx) => (
          <ReviewsCard review={review} key={idx} />
        ))}
      </Box>
    </Box>
  );
};

export default Reviews;
