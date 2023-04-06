import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors } from '../../actions/productAction';
import { ErrorNotFound, Loader } from '../Shared';
import { useParams } from 'react-router-dom';
import { Box, Rating, Typography } from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  return (
    <>
      {id !== product?._id && <ErrorNotFound />}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              justifyContent: {
                xs: 'center',
                md: 'center',
              },
              alignItems: 'center',
              p: 2,
            }}
          >
            <Box
              sx={{
                p: 2,
              }}
            >
              <img
                src={`${product?.images[0]?.url}`}
                alt={`${product?.name}`}
                title={`${product?.name}`}
                width={225}
                height={275}
                loading="lazy"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                p: 2,
              }}
            >
              <Typography variant="h6">{product?.name}</Typography>
              <Typography variant="h7">{product?.description}</Typography>
              <Typography variant="span">{product?.category}</Typography>
              <Typography variant="span">${product?.price}</Typography>
              <Typography variant="span">
                Status:{' '}
                {product?.stock > 10 ? (
                  <span style={{ color: 'green' }}>In Stock</span>
                ) : (
                  <span style={{ color: 'red' }}>Out of Stock</span>
                )}
              </Typography>
              <Typography variant="span" sx={{ ml: -0.5 }}>
                <Rating
                  name="half-rating-read"
                  defaultValue={product?.ratings}
                  precision={0.5}
                  readOnly
                />
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductDetails;
