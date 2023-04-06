import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import { clearErrors, getProductDetails } from '../../../actions/productAction';
import { ErrorNotFound, Loader } from '../../Shared';
import AddReview from '../Reviews/AddReview';
import Reviews from '../Reviews/Reviews';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const increaseQuantity = () => {
    let stock = product?.stock;
    if (stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
    console.log(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
    console.log(qty);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {id !== product?._id && <ErrorNotFound />}
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
              {product.images &&
                product.images.map((item, idx) => (
                  <img
                    key={idx}
                    src={item?.url}
                    alt={`${product?.name}`}
                    title={`${product?.name}`}
                    width={225}
                    height={305}
                    loading="lazy"
                  />
                ))}
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
              <Typography variant="p">{product?.description}</Typography>
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
              <Typography variant="span" sx={{ ml: -0.5, display: 'flex' }}>
                <Rating
                  name="half-rating-read"
                  defaultValue={product?.ratings}
                  precision={0.5}
                  readOnly
                />{' '}
                <Typography variant="span" sx={{ ml: 1 }}>
                  (
                  {product?.numOfReviews > 1
                    ? product?.numOfReviews + ' reviews'
                    : product?.numOfReviews + ' review'}
                  )
                </Typography>
              </Typography>
              <Typography
                variant="span"
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: '20px',
                    fontWeight: 700,
                  }}
                  onClick={decreaseQuantity}
                >
                  —
                </Button>
                <TextField
                  readOnly
                  type="number"
                  sx={{
                    width: 70,
                  }}
                  value={quantity}
                />
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: '20px',
                    fontWeight: 700,
                  }}
                  onClick={increaseQuantity}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    ml: 3,
                    // fontSize: '10px',
                  }}
                >
                  Add to cart
                </Button>
              </Typography>
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                sx={{
                  mt: 2,
                  cursor: 'pointer',
                }}
              >
                Add Review
              </Button>
              <AddReview open={open} handleClickClose={handleClickClose} />
            </Box>
          </Box>
          <Box>
            <Reviews />
          </Box>
        </>
      )}
    </>
  );
};

export default ProductDetails;
