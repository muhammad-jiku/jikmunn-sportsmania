import React from 'react';
//  external imports
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
//  internal imports
import CartCard from '../Carts/CartCard';
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item?.quantity * item?.price,
    0
  );

  const shippingPrice = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingPrice;

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingPrice,
      tax,
      totalPrice,
    };
    // console.log(data);
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/process/payment');
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <CheckoutSteps activeStep={1} />

      {/* Cards */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/*  Personal Info Card */}
        <Box
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: {
              xs: '100%',
              md: '60%',
            },
            borderRadius: '30px',
            boxShadow: '5px 5px 10px black',
          }}
        >
          <Typography
            varinat="span"
            color="primary.main"
            textAlign="center"
            sx={{
              fontSize: {
                xs: '18px',
                sm: '22px',
                md: '26px',
              },
            }}
          >
            Shipping Details Information
          </Typography>
          {/* Name */}
          <TextField
            sx={{ pt: 2 }}
            fullWidth
            variant="standard"
            defaultValue={user?.name}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* Phone */}
          <TextField
            sx={{ pt: 2 }}
            fullWidth
            variant="standard"
            defaultValue={shippingInfo?.phoneNo}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* Address */}
          <TextField
            sx={{ pt: 2 }}
            fullWidth
            variant="standard"
            defaultValue={address}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/*  Carts Item Card */}
        <Box sx={{ p: 2 }}>
          {cartItems &&
            cartItems.map((item) => (
              <Box key={item?.product}>
                <CartCard item={item} />
              </Box>
            ))}
        </Box>
      </Box>
      {/* Orders Cost */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/*  Subtotal */}
          <Box
            sx={{
              p: 2,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              fontWeight: 800,
            }}
          >
            <Typography variant="span">Subtotal: </Typography>
            <Typography variant="span">${subtotal}</Typography>
          </Box>
          {/* Shipping Charges*/}
          <Box
            sx={{
              p: 2,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              fontWeight: 800,
            }}
          >
            <Typography variant="span">Shipping Charges: </Typography>
            <Typography variant="span">${shippingPrice}</Typography>
          </Box>
          {/* VAT */}
          <Box
            sx={{
              p: 2,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              fontWeight: 800,
            }}
          >
            <Typography variant="span">VAT: </Typography>
            <Typography variant="span">${tax}</Typography>
          </Box>
          {/* Total */}
          <Box
            sx={{
              p: 2,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              fontWeight: 800,
            }}
          >
            <Typography variant="span">Total: </Typography>
            <Typography variant="span">${totalPrice}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
          }}
        >
          <Button onClick={proceedToPayment}>
            <Typography
              sx={{
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
                fontWeight: 900,
              }}
            >
              Proceed To Payment
            </Typography>{' '}
            <ArrowRightAltIcon sx={{ ml: 1 }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmOrder;
