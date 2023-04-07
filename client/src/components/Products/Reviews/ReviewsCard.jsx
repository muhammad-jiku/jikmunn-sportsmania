import React from 'react';
import { Box, Rating, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const ReviewsCard = ({ review }) => {
  return (
    <Box
      sx={{
        p: 2,
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: '10px',
        height: 275,
        width: 300,
      }}
    >
      <FormatQuoteIcon size="large" color="primary" sx={{ fontSize: '35px' }} />
      <Typography
        variant="h7"
        color="primary"
        sx={{
          mb: 6,
        }}
      >
        {review?.comment}
      </Typography>
      <Typography>
        <Rating
          name="half-rating-read"
          defaultValue={review?.rating}
          precision={0.5}
          readOnly
        />
      </Typography>
      <Typography
        variant="span"
        color="text.secondary"
        sx={{
          mb: 2,
        }}
      >
        {' '}
        - {review?.name}
      </Typography>
    </Box>
  );
};

export default ReviewsCard;
