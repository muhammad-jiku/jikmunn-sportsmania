import React, { useEffect, useRef } from 'react';
//  external imports
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import {
  useStripe,
  useElements,
  // CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
//  internal imports
import CheckoutSteps from './CheckoutSteps';
import { clearErrors, createOrder } from '../../../actions/orderAction';

const Payment = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice),
  };
  // console.log(orderInfo);
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo?.subtotal,
    taxPrice: orderInfo?.tax,
    shippingPrice: orderInfo?.shippingPrice,
    totalPrice: orderInfo?.totalPrice,
  };

  const { reset, handleSubmit } = useForm();

  const onSubmitHandler = async (values) => {
    payBtn.current.disabled = true;
    try {
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

      const { error: paymentError, paymentMethod } =
        await stripe.createPaymentMethod({
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
        console.log(paymentError);
        console.log(paymentMethod);

        alert.error('Something Went Wrong!');
        // alert.error(result.error);
        // alert.error(paymentError);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result?.paymentIntent?.id,
            status: result?.paymentIntent?.status,
          };

          dispatch(createOrder(order));
          reset();
          alert.success('Payment Successfull!');
          navigate('/success');
        } else {
          // console.log("There's some issue while processing payment!");
          alert.error("There's some issue while processing payment!");
        }
      }
    } catch (err) {
      console.log(err.message);
      payBtn.current.disabled = false;

      // console.log(err.response.data.message);
      // alert.error(err.response.data.message);
      alert.error('Something Went Wrong!');
    }
  };

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Box sx={{ p: 2 }}>
      <CheckoutSteps activeStep={2} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{
            p: 2,
            my: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: {
              xs: '100%',
              md: '60%',
            },
            borderRadius: {
              xs: '30px',
              md: 0,
            },
            boxShadow: {
              xs: '5px 5px 10px black',
              md: 0,
            },
          }}
        >
          {' '}
          <Typography
            varinat="span"
            color="primary.main"
            textAlign="center"
            sx={{
              mt: 4,
              fontSize: {
                xs: '22px',
                md: '26px',
              },
            }}
          >
            Card Information
          </Typography>
          {/* Card */}
          <Box sx={{ p: 2, mt: 2, borderBottom: '1px solid #682404' }}>
            {/* <CardElement /> */}
            <CardNumberElement />
          </Box>
          {/* Date */}
          <Box sx={{ p: 2, mt: 2, borderBottom: '1px solid #682404' }}>
            <CardExpiryElement />
          </Box>
          {/*  CVC Code */}
          <Box sx={{ p: 2, mt: 2, borderBottom: '1px solid #682404' }}>
            <CardCvcElement />
          </Box>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              p: 1.8,
              mt: 4,
              fontSize: '14px',
            }}
            ref={payBtn}
          >
            Pay - ${orderInfo && orderInfo?.totalPrice}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
