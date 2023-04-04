import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Loader } from '../../Shared';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clearErrors, updatePassword } from '../../../actions/userAction';
import { updatePasswordSchema } from '../ValidationSchema';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UPDATE_PASSWORD_RESET } from '../../../constants/userConstant';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmitHandler = (values) => {
    const passwordsInfo = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      passwordConfirm: values.passwordConfirm,
    };
    dispatch(updatePassword(passwordsInfo));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate('/dashboard');

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          <Typography variant="h6" color="primary" textAlign="center">
            Update Password
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{
              p: 2,
            }}
          >
            <TextField
              sx={{ mb: 2 }}
              label="Old Password"
              fullWidth
              required
              type={showOldPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowOldPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Old Password"
              error={!!errors['oldPassword']}
              helperText={
                errors['oldPassword'] ? errors['oldPassword'].message : ''
              }
              {...register('oldPassword')}
            />
            <TextField
              sx={{ mb: 2 }}
              label="New Password"
              fullWidth
              required
              type={showNewPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="New Password"
              error={!!errors['newPassword']}
              helperText={
                errors['newPassword'] ? errors['newPassword'].message : ''
              }
              {...register('newPassword')}
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

export default UpdatePassword;
