import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import {
  addItemsToCart,
  removeItemsFromCart,
} from '../../../actions/cartAction';
import CartCard from './CartCard';

const Carts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <>
      {!cartItems ? (
        <Box sx={{ m: 2, p: 2 }}>
          <Typography variant="h5" textAlign="center" color="red">
            No items added to your cart!
          </Typography>
        </Box>
      ) : (
        <>
          {console.log(cartItems)}
          <Box>
            <Typography variant="p">Product</Typography>
            <Typography variant="p">Quantity</Typography>
            <Typography variant="p">Subtotal</Typography>

            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product}>
                  <CartCard item={item} deleteCartItems={deleteCartItems} />
                  <div>
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p>{`$ ${item.price * item.quantity}`}</p>
                </div>
              ))}

            <div>
              <div></div>
              <div>
                <p>Gross Total</p>
                <p>{`$ ${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div>
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </Box>
        </>
      )}
    </>
  );
};

export default Carts;
