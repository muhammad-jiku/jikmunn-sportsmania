import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../../actions/userAction';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../../utils/ValidationSchema';

const Login = ({ setAuthProcess }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    error,
    // loading,
    isAuthenticated,
  } = useSelector((state) => state.user);

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
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler = (values) => {
    // console.log(values);
    const userInfo = {
      email: values.email,
      password: values.password,
    };
    // console.log(userInfo);
    dispatch(loginUser(userInfo));
  };

  let from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(from, {
        replace: true,
      });
    }
  }, [dispatch, error, isAuthenticated, navigate, from]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row-reverse',
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
          product. Please Login to enjoy your time here!
        </Typography>
      </Box>
      <Box
        sx={{ py: 2 }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          label="Email"
          fullWidth
          required
          type="email"
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
        <Link to="/password/forgot" style={{ textDecoration: 'none' }}>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            variant="span"
            color="text.secondary"
          >
            Forget Password?
          </Typography>
        </Link>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            py: '0.8rem',
            mt: '1rem',
          }}
        >
          Login
        </Button>{' '}
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
          New to
          <Typography variant="span" color="primary" sx={{ ml: 0.5 }}>
            SportsMania?{' '}
            <Typography
              variant="span"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => setAuthProcess('registration')}
            >
              Click Here!
            </Typography>
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
