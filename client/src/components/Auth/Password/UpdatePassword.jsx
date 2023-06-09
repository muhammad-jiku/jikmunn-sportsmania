import React, { useEffect, useState } from 'react';
//  external imports
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Loader } from '../../Shared';
import { updatePasswordSchema } from '../../../utils/ValidationSchema';
import { clearErrors, updatePassword } from '../../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../../constants/userConstant';

const UpdatePassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

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
      oldPassword: values?.oldPassword,
      newPassword: values?.newPassword,
      passwordConfirm: values?.passwordConfirm,
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
      // console.log(error);
      alert.error('Something Went Wrong!');
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Password Updated Successfully!');
      navigate('/dashboard');

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

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
            alignItems: 'center',
          }}
        >
          <Typography
            variant="span"
            color="primary"
            textAlign="center"
            sx={{ fontWeight: 800 }}
          >
            Secure profile by updating your password
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
