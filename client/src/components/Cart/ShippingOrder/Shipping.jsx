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
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingSchema } from '../../../utils/ValidationSchema';

const Shipping = () => {
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
    console.log(shippingDetails);

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
    <>
      <CheckoutSteps activeStep={0} />

      <Box>
        <Box>
          <Typography varinat="h2">Shipping Details</Typography>

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
            />

            {/* Country */}
            <TextField
              id="outlined-select-country"
              select
              label="Select"
              defaultValue={country}
              onChange={(e) => setCountry(e.target.value.toString())}
              sx={{ mt: 2 }}
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
                id="outlined-select-state"
                select
                label="Select"
                defaultValue={state}
                onChange={(e) => setState(e.target.value.toString())}
                sx={{ mt: 2 }}
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
              // fullWidth
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
    </>
  );
};

export default Shipping;
