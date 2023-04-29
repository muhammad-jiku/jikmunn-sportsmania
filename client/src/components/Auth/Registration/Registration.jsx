import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import profile from '../../../assets/images/avatar_1.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../../actions/userAction';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { registerSchema } from '../../../utils/ValidationSchema';

const Registration = ({ setAuthProcess }) => {
  const alert = useAlert();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    error,
    // loading,
    isAuthenticated,
  } = useSelector((state) => state.user);

  const [isChecked, setIsChecked] = useState(false);
  const [avatar, setAvatar] = useState(`${profile}`);
  const [avatarPreview, setAvatarPreview] = useState(`${profile}`);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerSchema),
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
      password: values.password,
      avatar,
    };
    // console.log(userInfo);
    dispatch(registerUser(userInfo));
  };

  let from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsChecked(false);
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(from, {
        replace: true,
      });
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, from]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          py: 2,
          mx: 2,
          mb: {
            xs: 0,
            md: 8,
          },
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="span"
          color="primary.main"
          sx={{ fontSize: '32px', fontWeight: 900 }}
        >
          Hello there!
        </Typography>
        <Typography
          variant="span"
          textAlign="justify"
          sx={{ fontSize: '18px', fontWeight: 700 }}
        >
          Welcome to{' '}
          <Typography variant="span" color="primary.main">
            Sports Mania
          </Typography>{' '}
          Online Shop. Here you can find your lovable and desirable sports
          product. Please Create an account to enjoy your time here!
        </Typography>
      </Box>
      <Box
        sx={{ py: 2 }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 2,
          }}
        >
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
          {/* <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            htmlFor="profile"
          >
            <input
              hidden
              onChange={handleAvatar}
              accept="image/*"
              type="file"
              id="profile"
              name="profile"
            />
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
          </IconButton> */}
        </Box>

        <TextField
          sx={{ mb: 2 }}
          label="Name"
          fullWidth
          required
          type="text"
          placeholder="Name"
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Email"
          fullWidth
          required
          type="email"
          placeholder="Email"
          error={!!errors['email']}
          helperText={errors['email'] ? errors['email'].message : ''}
          {...register('email')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Password"
          fullWidth
          required
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder="Password"
          error={!!errors['password']}
          helperText={errors['password'] ? errors['password'].message : ''}
          {...register('password')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Confirm Password"
          fullWidth
          required
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder="Confirm Password"
          error={!!errors['passwordConfirm']}
          helperText={
            errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
          }
          {...register('passwordConfirm')}
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                required
              />
            }
            {...register('terms')}
            label={
              <Typography
                color={errors['terms'] ? 'error' : 'inherit'}
                variant="span"
                sx={{ fontSize: '14px', fontWeight: 700 }}
              >
                Accept Terms and Conditions
              </Typography>
            }
          />
          <FormHelperText error={!!errors['terms']}>
            {errors['terms'] ? errors['terms'].message : ''}
          </FormHelperText>
        </FormGroup>

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Register
        </Button>
        <Typography
          sx={{
            mt: 1.5,
            fontSize: '14px',
            fontWeight: 700,
            display: 'flex',
            justifyContent: 'center',
          }}
          variant="span"
          color="text.secondary"
        >
          Already have an account?
          <Typography
            variant="span"
            color="primary"
            sx={{ cursor: 'pointer', ml: 0.5 }}
            onClick={() => setAuthProcess('login')}
          >
            Login Now!
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Registration;
