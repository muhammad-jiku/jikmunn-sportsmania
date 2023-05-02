import React from 'react';
//  external imports
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box, Button, Typography } from '@mui/material';
//  internal import
import CartCard from './CartCard';

const Carts = () => {
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <Box>
      {cartItems?.length !== 0 ? (
        <Box
          sx={{
            p: 2,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Box
            sx={{
              px: 2,
              borderBottom: '2px solid #682404',
              width: {
                xs: 'auto',
                md: '80%',
              },
            }}
          >
            <Typography
              variant="span"
              color="primary.main"
              textAlign="center"
              sx={{
                fontSize: '28px',
                fontWeight: 900,
              }}
            >
              Your Cart {cartItems?.length === 1 ? 'Item' : 'Items'}
            </Typography>
          </Box>

          {cartItems &&
            cartItems.map((item) => (
              <Box key={item?.product}>
                <CartCard item={item} />
              </Box>
            ))}

          <Box
            sx={{
              my: 1,
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                p: 2,
                fontSize: '22px',
                fontWeight: 800,
              }}
            >
              <Typography variant="span">Gross Total: </Typography>
              <Typography variant="span">
                {` $${cartItems.reduce(
                  (acc, item) => acc + item?.quantity * item?.price,
                  0
                )}`}
              </Typography>
            </Box>
            <Box>
              <Button onClick={checkoutHandler}>
                Check Out <ArrowRightAltIcon sx={{ ml: 1 }} />
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            m: 2,
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            fontWeight: 800,
          }}
        >
          <Typography variant="span" color="red" fontSize={'22px'}>
            No items added to your cart!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Carts;
