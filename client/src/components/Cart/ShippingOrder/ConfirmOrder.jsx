import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { Box, Button, Typography } from '@mui/material';

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item?.quantity * item?.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    console.log(data);
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/process/payment');
  };

  return (
    <>
      <CheckoutSteps activeStep={1} />
      <Box>
        <Box>
          <Box>
            <Typography>Shipping Info</Typography>
            <Box>
              <Box>
                <Typography variant="p">Name:</Typography>
                <Typography variant="span">{user?.name}</Typography>
              </Box>
              <Box>
                <Typography variant="p">Phone:</Typography>
                <Typography variant="span">{shippingInfo?.phoneNo}</Typography>
              </Box>
              <Box>
                <Typography variant="p">Address:</Typography>
                <Typography variant="span">{address}</Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography>Your Cart Items:</Typography>
            <Box>
              {cartItems &&
                cartItems.map((item) => (
                  <Box key={item?.product}>
                    <img src={item?.image} alt="Product" width={275} />
                    <Link to={`/product/${item?.product}`}>
                      {item?.name}
                    </Link>{' '}
                    <Typography variant="span">
                      {item?.quantity} X ${item?.price} ={' '}
                      <Typography variant="h5">
                        ${item?.price * item?.quantity}
                      </Typography>
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
        {/*  */}
        <Box>
          <Box>
            <Typography>Order Summery</Typography>
            <Box>
              <Box>
                <Typography variant="p">Subtotal:</Typography>
                <Typography variant="span">${subtotal}</Typography>
              </Box>
              <Box>
                <Typography variant="p">Shipping Charges:</Typography>
                <Typography variant="span">${shippingCharges}</Typography>
              </Box>
              <Box>
                <Typography variant="p">VAT:</Typography>
                <Typography variant="span">${tax}</Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="p">
                <Typography
                  sx={{
                    fontWeight: 800,
                  }}
                >
                  Total:
                </Typography>
              </Typography>
              <Typography variant="span">${totalPrice}</Typography>
            </Box>
            <Button onClick={proceedToPayment}>Proceed To Payment</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ConfirmOrder;
