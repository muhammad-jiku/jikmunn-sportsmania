import React, { useEffect, useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { Country, State } from 'country-state-city';
import { saveShippingInfo } from '../../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import MapIcon from '@mui/icons-material/Map';
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingSchema } from '../../../utils/ValidationSchema';

const Shipping = () => {
  const alert = useAlert();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state?.cart);

  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [state, setState] = useState(shippingInfo?.state);
  const [city, setCity] = useState(shippingInfo?.city);
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode);
  const [address, setAddress] = useState(shippingInfo?.address);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(shippingSchema),
  });

  const onSubmitHandler = (values) => {
    const shippingDetails = {
      address: values.address,
      city: values.city,
      state,
      country,
      pinCode: values.pin,
      phoneNo: values.phone,
    };
    // console.log(shippingDetails);
    alert.success('Shipping Details Info Fulfilled!');
    dispatch(saveShippingInfo(shippingDetails));
    reset();
    navigate('/order/confirm');
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <CheckoutSteps activeStep={0} />
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          varinat="span"
          color="primary.main"
          textAlign="center"
          sx={{
            fontSize: {
              xs: '22px',
              md: '26px',
            },
          }}
        >
          Shipping Details Information
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: {
              xs: '100%',
              md: '60%',
            },
          }}
        >
          {/* Address */}
          <TextField
            sx={{ mt: 2 }}
            label="Address"
            fullWidth
            required
            type="text"
            placeholder="Address"
            name="address"
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!errors['address']}
            helperText={errors['address'] ? errors['address'].message : ''}
            {...register('address')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FmdGoodIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* City */}
          <TextField
            sx={{ mt: 2 }}
            label="City"
            fullWidth
            required
            type="text"
            placeholder="City"
            name="city"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
            error={!!errors['city']}
            helperText={errors['city'] ? errors['city'].message : ''}
            {...register('city')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
          />

          {/*  Pin Code */}
          <TextField
            sx={{ mt: 2 }}
            label="Pin Code"
            fullWidth
            required
            type="text"
            placeholder="Pin Code"
            name="pin"
            defaultValue={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            error={!!errors['pin']}
            helperText={errors['pin'] ? errors['pin'].message : ''}
            {...register('pin')}
            // {...register('pin', {
            //   setValueAs: (v) => (v === '' ? undefined : parseInt(v, 4)),
            // })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCityIcon />
                </InputAdornment>
              ),
            }}
          />

          {/*  Phone */}
          <TextField
            sx={{ mt: 2 }}
            label="Phone"
            fullWidth
            required
            type="text"
            placeholder="Phone"
            name="phone"
            defaultValue={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            error={!!errors['phone']}
            helperText={errors['phone'] ? errors['phone'].message : ''}
            {...register('phone')}
            // {...register('phone', {
            //   setValueAs: (v) => (v === '' ? undefined : parseInt(v, 11)),
            // })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Country */}
          <TextField
            fullWidth
            id="outlined-select-country"
            select
            label="Select"
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value.toString())}
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon />
                </InputAdornment>
              ),
            }}
          >
            {Country &&
              Country.getAllCountries().map((item) => (
                <MenuItem
                  key={item.isoCode}
                  value={item.isoCode}
                  label="Country"
                  placeholder="Country"
                >
                  {item.name}
                </MenuItem>
              ))}
          </TextField>

          {/* State */}
          {country && (
            <TextField
              fullWidth
              id="outlined-select-state"
              select
              label="Select"
              defaultValue={state}
              onChange={(e) => setState(e.target.value.toString())}
              sx={{ mt: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapIcon />
                  </InputAdornment>
                ),
              }}
            >
              {State &&
                State?.getStatesOfCountry(country).map((item) => (
                  <MenuItem
                    key={item.isoCode}
                    value={item.isoCode}
                    label="State"
                    placeholder="State"
                  >
                    {item.name}
                  </MenuItem>
                ))}
            </TextField>

            // <Select
            //   name="state"
            //   defaultValue={state}
            //   label="State"
            //   fullWidth
            //   onChange={(e) => setState(e.target.value)}
            //   sx={{ mt: 2 }}
            // >
            //   <MenuItem value={''}>State</MenuItem>
            //   {State &&
            //     State?.getStatesOfCountry(country).map((item) => (
            //       <MenuItem key={item.isoCode} value={item.isoCode}>
            //         {item.name}
            //       </MenuItem>
            //     ))}
            // </Select>
          )}

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              p: 1.8,
              mt: 2,
              fontSize: '14px',
            }}
            disabled={state ? false : true}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Shipping;
