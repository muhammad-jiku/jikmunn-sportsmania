import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  useStripe,
  useElements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { clearErrors, createOrder } from '../../../actions/orderAction';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema } from '../../../utils/ValidationSchema';

const Payment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  console.log(user);
  console.log(shippingInfo);
  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo?.subtotal,
    taxPrice: orderInfo?.tax,
    shipcvcgPrice: orderInfo?.shipcvcgCharges,
    totalPrice: orderInfo?.totalPrice,
  };

  const { reset, handleSubmit } = useForm();

  const onSubmitHandler = async (values) => {
    payBtn.current.disabled = true;
    try {
      console.log(values);
      const config = {
        headers: {
          authorization: `Bearer ${localStorage?.getItem('token')}`,
          'content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      // const card = elements.getElement(CardElement);
      const card = elements.getElement(CardNumberElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (card == null) {
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            address: {
              line1: shippingInfo?.address,
              city: shippingInfo?.city,
              state: shippingInfo?.state,
              postal_code: shippingInfo?.pinCode,
              country: shippingInfo?.country,
            },
          },
        },
      });
      console.log(paymentMethod);
      if (result.error) {
        payBtn.current.disabled = false;
        console.log(result.error);
        console.log(paymentMethod);
        console.log(error);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          reset();
          navigate('/success');
        } else {
          console.log("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      console.log(error.message);
      payBtn.current.disabled = false;
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <CheckoutSteps activeStep={2} />
      <Box>
        <Typography>Card Info</Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 2,
          }}
        >
          {/* Card */}
          <Box sx={{ mt: 2 }}>
            {/* <CardElement /> */}
            <CardNumberElement />
          </Box>

          {/* Date */}
          <Box sx={{ mt: 2 }}>
            <CardExpiryElement />
          </Box>

          {/*  CVC Code */}
          <Box sx={{ mt: 2 }}>
            <CardCvcElement />
          </Box>

          <Button
            variant="contained"
            // fullWidth
            type="submit"
            sx={{
              p: 1.8,
              mt: 2,
              fontSize: '14px',
            }}
            ref={payBtn}
          >
            Pay - ${orderInfo && orderInfo?.totalPrice}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Payment;
