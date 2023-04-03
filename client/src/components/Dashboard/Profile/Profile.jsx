import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, TextField } from '@mui/material';
import { userInfoSchema } from '../../Auth/ValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import profile from '../../../assets/images/avatar_1.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  loadUser,
  updateProfile,
} from '../../../actions/userAction';
import { Loader } from '../../Shared';
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstant';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  // console.log('user', user);

  const [name, setName] = useState(user ? user?.name : ``);
  const [email, setEmail] = useState(user ? user?.email : ``);
  const [phone, setPhone] = useState(user?.phone?.length ? user?.phone : ``);
  const [address, setAddress] = useState(
    user?.address?.length ? user?.address : ``
  );
  const [avatar, setAvatar] = useState(user ? user?.avatar?.url : profile);
  const [avatarPreview, setAvatarPreview] = useState(
    user ? user?.avatar?.url : profile
  );

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
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
      name: values.name,
      email: values.email,
      avatar,
      phone: values.phone,
      address: values.address,
    };
    console.log('updated user info...', userInfo);
    dispatch(updateProfile(userInfo));
  };

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
      setAvatar(user.avatar.url);
      setPhone(user.phone);
      setAddress(user.address);
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
        <Box>
          {/* {console.log(user)} */}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{
              display: 'flex',
              // flexDirection: 'column',
              justifyContent: 'space-between',
              // p: 2,
            }}
          >
            <Box
              sx={{
                p: 2,
              }}
            >
              <TextField
                sx={{ mt: 2 }}
                label="Name"
                fullWidth
                required
                type="text"
                placeholder={user ? '' : 'Name'}
                name="name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors['name']}
                helperText={errors['name'] ? errors['name'].message : ''}
                {...register('name')}
              />
              <TextField
                sx={{ mt: 2 }}
                label="Email"
                fullWidth
                required
                type="email"
                placeholder={user ? '' : 'Email'}
                name="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  readOnly: true,
                }}
                error={!!errors['email']}
                helperText={errors['email'] ? errors['email'].message : ''}
                {...register('email')}
              />
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
            </Box>
            <Box
              sx={{
                py: 2,
                px: 0,
              }}
            >
              <TextField
                sx={{ mt: 2 }}
                label="Phone"
                fullWidth
                required
                type="tel"
                pattern="[0-9]"
                placeholder={user?.phone?.length ? '' : 'Phone'}
                name="phone"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!!errors['phone']}
                helperText={errors['phone'] ? errors['phone'].message : ''}
                {...register('phone')}
              />
              <TextField
                sx={{ mt: 2 }}
                label="Address"
                multiline
                rows={3}
                fullWidth
                required
                type="text"
                placeholder={user?.address?.length ? '' : 'Address'}
                name="address"
                defaultValue={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!errors['address']}
                helperText={errors['address'] ? errors['address'].message : ''}
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
        </Box>
      )}
    </>
  );
};

export default Profile;
