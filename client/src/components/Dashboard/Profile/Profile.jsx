import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, MenuItem, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import profile from '../../../assets/images/avatar_1.png';
import { useDispatch, useSelector } from 'react-redux';
import { Country, State } from 'country-state-city';
import {
  clearErrors,
  loadUser,
  updateProfile,
} from '../../../actions/userAction';
import { Loader } from '../../Shared';
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstant';
import { useNavigate } from 'react-router-dom';
import { userInfoSchema } from '../../../utils/ValidationSchema';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  // console.log('user', user);

  const [name, setName] = useState(user ? user?.name : ``);
  const [email, setEmail] = useState(user ? user?.email : ``);
  const [avatar, setAvatar] = useState(user ? user?.avatar?.url : profile);
  const [avatarPreview, setAvatarPreview] = useState(
    user ? user?.avatar?.url : profile
  );
  const [phone, setPhone] = useState(user?.phone?.length ? user?.phone : ``);
  const [country, setCountry] = useState(user?.country ? user?.country : ``);
  const [state, setState] = useState(user?.state ? user?.state : ``);
  const [city, setCity] = useState(user?.city ? user?.city : ``);
  const [address, setAddress] = useState(
    user?.address?.length ? user?.address : ``
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(userInfoSchema),
  });

  const handleAvatar = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
        // do something with the result
        // console.log(reader.result);
      };
    } else {
      console.error('The selected file is not a valid Blob object.');
    }
  };

  const onSubmitHandler = (values) => {
    // console.log(values);
    const userInfo = {
      name: values?.name,
      email: values?.email,
      avatar,
      phone: values?.phone,
      country,
      state,
      city: values?.city,
      address: values?.address,
    };
    // console.log('updated user info...', userInfo);
    dispatch(updateProfile(userInfo));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setAvatarPreview(user?.avatar?.url);
      setAvatar(user?.avatar?.url);
      setPhone(user?.phone);
      setCountry(user?.country);
      setState(user?.state);
      setCity(user?.city);
      setAddress(user?.address);
    }

    if (isUpdated) {
      dispatch(loadUser());
      navigate('/dashboard');
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  console.log(errors);

  return (
    <>
      {console.log(user)}
      {console.log(country)}
      {console.log(city)}
      {console.log(state)}
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {user && (
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmitHandler)}
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                {/* name */}
                <TextField
                  sx={{ mt: 2 }}
                  label={user ? '' : 'Name'}
                  fullWidth
                  required
                  type="text"
                  placeholder={user ? '' : 'Name'}
                  name="name"
                  defaultValue={name}
                  // value={name}
                  onChange={(e) => setName(e?.target?.value)}
                  error={!!errors['name']}
                  helperText={errors['name'] ? errors['name'].message : ''}
                  {...register('name')}
                />

                {/* email */}
                <TextField
                  sx={{ mt: 2 }}
                  label={user ? '' : 'Email'}
                  fullWidth
                  required
                  type="email"
                  placeholder={user ? '' : 'Email'}
                  name="email"
                  defaultValue={email}
                  // value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  InputProps={{
                    readOnly: true,
                  }}
                  error={!!errors['email']}
                  helperText={errors['email'] ? errors['email'].message : ''}
                  {...register('email')}
                />

                {/* avatar */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    alt="Change Avatar"
                    title="Change Avatar"
                    src={avatarPreview}
                    sx={{
                      height: 50,
                      width: 50,
                      border: '1px solid',
                      borderColor: 'secondary',
                      cursor: 'pointer',
                      mt: 2,
                      mr: 1,
                    }}
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{
                      p: 1.8,
                      mt: 2,
                      cursor: 'pointer',
                    }}
                  >
                    Choose Avatar
                    <input
                      onChange={handleAvatar}
                      accept="image/*"
                      type="file"
                      id="profile"
                      name="profile"
                      hidden
                    />
                  </Button>
                </Box>

                {/* phone */}
                <TextField
                  sx={{ mt: 2 }}
                  label={user?.phone?.length ? '' : 'Phone'}
                  fullWidth
                  required
                  type="tel"
                  pattern="[0-9]"
                  placeholder={user?.phone?.length ? '' : 'Phone'}
                  name="phone"
                  defaultValue={phone}
                  // value={phone}
                  onChange={(e) => setPhone(e?.target?.value)}
                  error={!!errors['phone']}
                  helperText={errors['phone'] ? errors['phone'].message : ''}
                  {...register('phone')}
                />

                {/* Country */}
                <TextField
                  fullWidth
                  id="outlined-select-country"
                  select
                  label={'Country'}
                  // defaultValue={country}
                  value={country}
                  onChange={(e) => setCountry(e?.target?.value)}
                  sx={{ mt: 2 }}
                >
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <MenuItem
                        key={item?.isoCode}
                        value={item?.isoCode}
                        label={'Country'}
                        placeholder={'Country'}
                      >
                        {item?.name}
                      </MenuItem>
                    ))}
                </TextField>

                {/* State */}
                <TextField
                  fullWidth
                  id="outlined-select-state"
                  select
                  label={'State'}
                  // defaultValue={state}
                  value={state}
                  onChange={(e) => setState(e?.target?.value)}
                  sx={{ mt: 2 }}
                >
                  {State?.getStatesOfCountry(country).map((item) => (
                    <MenuItem
                      key={item?.isoCode}
                      value={item?.isoCode}
                      label={'State'}
                      placeholder={'State'}
                    >
                      {item?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box sx={{ mx: 2 }}>
                {/* City */}
                <TextField
                  sx={{ mt: 2 }}
                  label={user?.city ? '' : 'City'}
                  fullWidth
                  required
                  type="text"
                  placeholder={user ? '' : 'City'}
                  name="city"
                  defaultValue={city}
                  // value={city}
                  onChange={(e) => setCity(e?.target?.value)}
                  error={!!errors['city']}
                  helperText={errors['city'] ? errors['city'].message : ''}
                  {...register('city')}
                />

                {/* address */}
                <TextField
                  sx={{ mt: 2, pt: 1 }}
                  label={user?.address?.length ? '' : 'Address'}
                  multiline
                  rows={10}
                  fullWidth
                  required
                  type="text"
                  placeholder={user?.address?.length ? '' : 'Address'}
                  name="address"
                  defaultValue={address}
                  // value={address}
                  onChange={(e) => setAddress(e?.target?.value)}
                  error={!!errors['address']}
                  helperText={
                    errors['address'] ? errors['address'].message : ''
                  }
                  {...register('address')}
                />

                <Button
                  variant="contained"
                  // fullWidth
                  type="submit"
                  sx={{
                    p: 1.8,
                    mt: 2,
                    fontSize: '14px',
                  }}
                >
                  Update Profile
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Profile;
