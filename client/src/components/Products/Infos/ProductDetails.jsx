import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import { clearErrors, getProductDetails } from '../../../actions/productAction';
import { ErrorNotFound, Loader } from '../../Shared';
import AddReview from '../Reviews/AddReview';
import Reviews from '../Reviews/Reviews';
import { addItemsToCart } from '../../../actions/cartAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    product?.images && `${product?.images[0]?.url}`
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
    // console.log(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
    // console.log(qty);
  };

  const handleAddProductToCart = () => {
    // console.log(id, quantity);
    dispatch(addItemsToCart(id, quantity));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
    // if (product) {
    //   setSelectedImage(`${product?.images[0]?.url}`);
    // }
  }, [
    error,
    dispatch,
    id,
    product,
    product?.ratings,
    product?.reviews,
    product?._id,
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!product && <ErrorNotFound />}
          {product && (
            <>
              <Box
                sx={{
                  p: 2,
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
                }}
              >
                <Box
                  sx={{
                    p: 2,
                  }}
                >
                  {product?.images && (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <img
                        // src={item?.url}
                        src={selectedImage || product?.images[0]?.url}
                        alt={`${product?.name}`}
                        title={`${product?.name}`}
                        height={300}
                        loading="lazy"
                      />
                      <Box
                        sx={{ p: 1, display: 'flex', justifyContent: 'center' }}
                      >
                        {product?.images.map((item, idx) => (
                          <img
                            key={idx}
                            src={item?.url}
                            alt={`${product?.name}`}
                            title={`${product?.name}`}
                            height={100}
                            loading="lazy"
                            onClick={() => setSelectedImage(item?.url)}
                            style={{
                              margin: '2px',
                              border: '1px solid brown',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    p: 2,
                    boxSizing: 'border-box',
                    width: {
                      xs: 'auto',
                      md: '450px',
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {product?.name}
                  </Typography>
                  <Typography
                    variant="span"
                    sx={{ ml: -0.5, display: 'flex', my: 1 }}
                  >
                    <Rating
                      name="half-rating-read"
                      defaultValue={product?.ratings}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography
                      variant="span"
                      sx={{ ml: 1, fontSize: '15px', fontWeight: 500 }}
                    >
                      (
                      {product?.numOfReviews > 1
                        ? product?.numOfReviews + ' reviews'
                        : product?.numOfReviews + ' review'}
                      )
                    </Typography>
                  </Typography>
                  <Typography variant="h7" sx={{ my: 0.5, fontWeight: 600 }}>
                    ${product?.price}
                  </Typography>
                  <Typography variant="p" sx={{ my: 1, fontWeight: 400 }}>
                    {product?.description}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      my: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 700,
                    }}
                  >
                    Quantity:
                    <Button
                      variant="outlined"
                      sx={{
                        ml: 1,
                        fontSize: '15px',
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
                      size="small"
                    />
                    <Button
                      variant="outlined"
                      sx={{
                        fontSize: '15px',
                      }}
                      onClick={increaseQuantity}
                    >
                      +
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        p: 1,
                      }}
                      disabled={product?.stock <= 10}
                      onClick={handleAddProductToCart}
                    >
                      <Typography
                        variant="span"
                        sx={{
                          display: {
                            xs: 'none',
                            md: 'block',
                          },
                        }}
                      >
                        {' '}
                        Add to cart{' '}
                      </Typography>{' '}
                      <ShoppingCartIcon
                        sx={{
                          display: {
                            xs: 'block',
                            md: 'none',
                          },
                        }}
                      />
                    </Button>
                  </Typography>
                  <Typography variant="p" sx={{ my: 1, fontWeight: 600 }}>
                    Category: {product?.category}
                  </Typography>
                  <Typography variant="p" sx={{ mb: 1, fontWeight: 600 }}>
                    Availability:
                    {product?.stock <= 10 ? (
                      <span style={{ color: 'red' }}> Out of Stock</span>
                    ) : (
                      <span style={{ color: 'green' }}> In Stock</span>
                    )}
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
                  <AddReview
                    open={open}
                    setOpen={setOpen}
                    handleClickClose={handleClickClose}
                  />
                </Box>
              </Box>
              {product?.reviews && product?.reviews[0] ? (
                <Box>
                  <Reviews product={product} />
                </Box>
              ) : (
                <Typography
                  variant="h3"
                  color="red"
                  textAlign="center"
                  sx={{
                    m: 4,
                    fontWeight: 600,
                  }}
                >
                  No Reviews Yet!
                </Typography>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
