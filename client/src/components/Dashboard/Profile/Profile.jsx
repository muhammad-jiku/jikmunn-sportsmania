import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
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
import CameraAltIcon from '@mui/icons-material/CameraAlt';

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: {
              xs: 'auto',
              md: '70%',
            },
          }}
        >
          <Typography
            variant="p"
            color="primary.main"
            sx={{ mx: 2, my: 1, fontSize: '26px', fontWeight: 800 }}
          >
            Profile Info
          </Typography>

          {/*  Desktop */}
          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          >
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
                <Box sx={{ ml: 4 }}>
                  {/* Name */}
                  <TextField
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

                  {/* Email */}
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

                  {/* Avatar */}
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

                  {/* Phone */}
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

                <Box sx={{ ml: 4 }}>
                  {/* City */}
                  <TextField
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

                  {/* Address */}
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

          {/* Mobile */}
          <Box
            sx={{
              display: {
                xs: 'block',
                md: 'none',
              },
            }}
          >
            {user && (
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmitHandler)}
                sx={{
                  p: 2,
                }}
              >
                <Box>
                  {/* Avatar */}
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <IconButton
                        aria-label="upload picture"
                        component="label"
                        htmlFor="profile"
                        sx={{
                          color: 'white',
                          backgroundColor: 'primary.main',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'white',
                          },
                        }}
                        size="small"
                      >
                        <input
                          hidden
                          onChange={handleAvatar}
                          accept="image/*"
                          type="file"
                          id="profile"
                          name="profile"
                        />
                        <CameraAltIcon />
                      </IconButton>
                    }
                  >
                    <Avatar
                      alt="Change Avatar"
                      title="Change Avatar"
                      src={avatarPreview}
                      sx={{
                        width: 125,
                        height: 125,
                        border: '1px solid',
                        borderColor: 'secondary',
                        cursor: 'pointer',
                      }}
                    />
                  </Badge>

                  {/* Name */}
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

                  {/* Email */}
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

                  {/* Phone */}
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

                  {/* Address */}
                  <TextField
                    sx={{ mt: 2, pt: 1 }}
                    label={user?.address?.length ? '' : 'Address'}
                    multiline
                    rows={5}
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
                    fullWidth
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
        </Box>
      )}
    </>
  );
};

export default Profile;
