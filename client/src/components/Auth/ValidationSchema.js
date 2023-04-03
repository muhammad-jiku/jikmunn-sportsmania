import { literal, object, string } from 'zod';

export const registerSchema = object({
  name: string().nonempty('Name is required').max(32, 'Name is too long'),
  email: string().nonempty('Email is required').email('Invalid email'),
  password: string()
    .nonempty('Password is required')
    .min(6, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
  terms: literal(true, {
    invalid_type_error: 'Accept Terms is required',
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export const loginSchema = object({
  email: string().nonempty('Email is required').email('Invalid email'),
  password: string()
    .nonempty('Password is required')
    .min(6, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export const userInfoSchema = object({
  name: string().nonempty('Name is required').max(32, 'Name is too long'),
  email: string().nonempty('Email is required').email('Invalid email'),
  phone: string()
    .nonempty('Phone number is required')
    .min(11, 'Phone number is not sufficient'),
  address: string()
    .nonempty('Address is required')
    .min(10, 'Address is too short'),
});

export const resetSchema = object({
  password: string()
    .nonempty('Password is required')
    .min(6, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});
