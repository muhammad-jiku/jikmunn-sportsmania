import React from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';
import ReviewsCard from './ReviewsCard';

const Reviews = ({ product }) => {
  // console.log(product);
  return (
    <Box
      sx={{
        p: 2,
        mt: 2,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          // overflowX: 'auto',
        }}
      >
        {' '}
        <Swiper
          scrollbar={{
            hide: false,
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          {product?.reviews?.map((review, idx) => (
            <SwiperSlide
              key={idx}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <ReviewsCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default Reviews;
