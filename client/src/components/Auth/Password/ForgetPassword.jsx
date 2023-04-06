import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../../actions/userAction';
import { Loader } from '../../Shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { forgetPasswordSchema } from '../../../utils/ValidationSchema';

const ForgetPassword = () => {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
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

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (message) {
      console.log(message);
    }
  }, [dispatch, error, message]);

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
          <Typography variant="h6" color="primary">
            Forgot Password
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
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
            />{' '}
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