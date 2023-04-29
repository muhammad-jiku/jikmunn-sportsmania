import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { clearErrors, getProductDetails } from '../../../actions/productAction';
import { ErrorNotFound, Loader } from '../../Shared';
import AddReview from '../Reviews/AddReview';
import Reviews from '../Reviews/Reviews';
import { addItemsToCart } from '../../../actions/cartAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HeightIcon from '@mui/icons-material/Height';

const ProductDetails = () => {
  const alert = useAlert();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const [open, setOpen] = useState(false);
  const [size, setSize] = useState('');
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
    // console.log(id, size, quantity);
    dispatch(addItemsToCart(id, size, quantity));
    alert.success('Item Added To Cart');
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
    // if (product) {
    //   setSelectedImage(`${product?.images[0]?.url}`);
    // }
  }, [
    dispatch,
    error,
    alert,
    id,
    product,
    product?.ratings,
    product?.reviews,
    product?._id,
  ]);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!product && <ErrorNotFound />}
          {product && (
            <>
              {/* {console.log(product)} */}
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
                  {/*  Name */}
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {product?.name}
                  </Typography>
                  {/*  Rating */}
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
                  {/*  Price */}
                  <Typography variant="h7" sx={{ my: 0.5, fontWeight: 600 }}>
                    ${product?.price}
                  </Typography>
                  {/*  Desc */}
                  <Typography variant="p" sx={{ my: 1, fontWeight: 400 }}>
                    {product?.description}
                  </Typography>
                  {/*  Size */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="p" sx={{ my: 1, fontWeight: 600 }}>
                      Size:
                    </Typography>{' '}
                    <TextField
                      sx={{ ml: 4.8, width: 150 }}
                      select
                      // fullWidth
                      // label="Size"
                      // placeholder="Size"
                      // required
                      size="small"
                      value={size || product?.size}
                      onChange={(e) => setSize(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HeightIcon />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {sizes.map((sz) => (
                        <MenuItem
                          key={sz}
                          value={sz}
                          label="Size"
                          placeholder="Size"
                        >
                          {sz || 'Choose Size'}
                        </MenuItem>
                      ))}

                      {/* <option value="">Choose Category</option>
          {categories.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))} */}
                    </TextField>
                  </Box>

                  {/*  Quantity */}
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
                  {/*  Category */}
                  <Typography variant="p" sx={{ my: 1, fontWeight: 600 }}>
                    Category: {product?.category}
                  </Typography>
                  {/*  Stock */}
                  <Typography variant="p" sx={{ mb: 1, fontWeight: 600 }}>
                    Availability:
                    {product?.stock <= 10 ? (
                      <span style={{ color: 'red' }}> Out of Stock</span>
                    ) : (
                      <span style={{ color: 'green' }}> In Stock</span>
                    )}
                  </Typography>
                  {/*  Review */}
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
    </Box>
  );
};

export default ProductDetails;
