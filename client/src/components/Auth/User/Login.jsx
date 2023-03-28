import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { loginSchema } from './ValidationSchema';

const Login = () => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler = (values) => {
    console.log(values);
  };
  console.log(errors);
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: '2rem' }}>
        Login
      </Typography>
      <Box
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
          type="password"
          error={!!errors['password']}
          helperText={errors['password'] ? errors['password'].message : ''}
          {...register('password')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Confirm Password"
          fullWidth
          required
          type="password"
          error={!!errors['passwordConfirm']}
          helperText={
            errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
          }
          {...register('passwordConfirm')}
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
