import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addItemsToCart,
  removeItemsFromCart,
} from '../../../actions/cartAction';

const CartCard = ({ item }) => {
  const dispatch = useDispatch();

  const increaseQuantity = (id, size, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, size, newQty));
  };

  const decreaseQuantity = (id, size, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, size, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <>
      {/*  Desktop View */}
      <Box
        sx={{
          my: 2,
          // boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: 'lightgray',
          borderRadius: '30px',
          boxShadow: '5px 5px 10px black',
          transition: '0.5s',
        }}
      >
        {console.log(item)}
        <Box
          sx={{
            p: 2,
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <img src={item?.image} alt={item?.name} height={75} />
          <Box
            sx={{
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxSizing: 'border-box',
            }}
          >
            <Link
              to={`/product/${item?.product}`}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              {item?.name}
            </Link>
            <Typography
              variant="span"
              // to={`/product/${item?.product}`}
              sx={{ pb: 2, color: 'gray', textDecoration: 'none' }}
            >
              Size: {item?.size}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            p: 2,
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                ml: 1,
                fontSize: '15px',
              }}
              onClick={() =>
                decreaseQuantity(item?.product, item?.size, item?.quantity)
              }
            >
              —
            </Button>
            <TextField
              readOnly
              type="number"
              sx={{
                // height: '22px',
                width: 50,
                fontSize: '15px',
              }}
              value={item?.quantity}
              size="small"
            />
            <Button
              variant="outlined"
              sx={{
                fontSize: '15px',
              }}
              onClick={() =>
                increaseQuantity(
                  item?.product,
                  item?.size,
                  item?.quantity,
                  item?.stock
                )
              }
            >
              +
            </Button>
          </Box>
          <Box
            sx={{
              p: 2,
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="span"
              sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
            >
              {' '}
              X ${item?.price}{' '}
              {/* </Typography>
          <Typography
            variant="span"
            sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
          > */}
              = ${item?.price * item?.quantity}
            </Typography>{' '}
            <Button
              sx={{
                pt: 0.5,
                px: 2,
                ml: 2,
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
              }}
              variant="outlined"
              onClick={() => deleteCartItems(item?.product)}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CartCard;
