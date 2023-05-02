import React, { useEffect, useState } from 'react';
//  external imports
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
//  internal imports
import { ErrorNotFound, Loader } from '../../Shared';
import { resetPasswordSchema } from '../../../utils/ValidationSchema';
import { clearErrors, resetPassword } from '../../../actions/userAction';

const ResetPassword = () => {
  const alert = useAlert();
  const { token } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

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
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmitHandler = (values) => {
    const passwordsInfo = {
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    };
    // console.log(token, passwordsInfo);
    dispatch(resetPassword(token, passwordsInfo));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error('Invalid Password!');
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password Updated Successfully');
      navigate('/login');
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <>
      {!token && <ErrorNotFound />}
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Typography
            variant="span"
            color="primary"
            textAlign={'center'}
            sx={{
              my: 1.5,
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            Reset your password here!
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{
              width: {
                xs: '100%',
                md: '60%',
              },
            }}
          >
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
                errors['passwordConfirm']
                  ? errors['passwordConfirm'].message
                  : ''
              }
              {...register('passwordConfirm')}
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                p: 1.8,
                mt: 2,
                fontSize: '12px',
              }}
            >
              Update Password
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ResetPassword;
