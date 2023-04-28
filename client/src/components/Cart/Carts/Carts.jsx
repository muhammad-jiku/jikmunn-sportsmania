import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import CartCard from './CartCard';

const Carts = () => {
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {cartItems ? (
        <Box
          sx={{
            p: 2,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
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

          <Box>
            <Box
              sx={{
                my: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
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
            <Box
              sx={{
                my: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button onClick={checkoutHandler}>Check Out</Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            m: 2,
            p: 2,
          }}
        >
          <Typography variant="h7" textAlign="center" color="red">
            No items added to your cart!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Carts;
