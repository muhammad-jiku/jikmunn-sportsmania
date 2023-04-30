import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../../actions/userAction';
import { Loader } from '../../Shared';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { forgetPasswordSchema } from '../../../utils/ValidationSchema';

const ForgetPassword = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmitHandler = (values) => {
    const emailInfo = {
      email: values.email,
    };
    // console.log('email...', emailInfo);
    dispatch(forgotPassword(emailInfo));
  };

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error('Invalid Email!');
      dispatch(clearErrors());
    }

    if (message) {
      // console.log(message);
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

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
            minHeight: '100vh',
          }}
        >
          <Typography
            variant="span"
            color="primary"
            textAlign={'center'}
            sx={{ fontSize: { xs: '14px', md: '18px' }, fontWeight: 700 }}
          >
            Ooops! It seems you forget the password!
          </Typography>
          <Typography
            variant="span"
            textAlign={'center'}
            sx={{ fontSize: { xs: '12px', md: '14px' }, fontWeight: 700 }}
          >
            Please write down your email to receive reset password mail!
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
              sx={{ mt: 2 }}
              label="Email"
              fullWidth
              required
              type="email"
              placeholder="Email"
              name="email"
              error={!!errors['email']}
              helperText={errors['email'] ? errors['email'].message : ''}
              {...register('email')}
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
              <SendIcon sx={{ fontSize: '20px', mr: 0.5 }} /> Send
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ForgetPassword;
