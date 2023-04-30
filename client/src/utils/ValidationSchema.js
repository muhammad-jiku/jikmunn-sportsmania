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
  city: string().nonempty('Please provide your city name'),
  address: string()
    .nonempty('Address is required')
    .min(10, 'Address is too short'),
});

export const forgetPasswordSchema = object({
  email: string().nonempty('Email is required').email('Invalid email'),
});

export const resetPasswordSchema = object({
  password: string()
    .nonempty('Password is required')
    .min(6, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export const updatePasswordSchema = object({
  oldPassword: string()
    .nonempty('Old password is not provided')
    .min(6, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  newPassword: string()
    .nonempty('New password is required')
    .min(6, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
}).refine((data) => data.newPassword === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export const reviewSchema = object({
  comment: string().nonempty('Please provide feedback'),
});

export const shippingSchema = object({
  // phone: number({
  //   // required_error: 'Please provide your phone numberr',
  //   // invalid_type_error: 'Invalid phone numberr',
  // })
  //   .int()
  //   .positive()
  //   .gte(11, { message: 'Invalid phone number' }),
  phone: string().nonempty('Please provide your phone number'),
  // country: string().nonempty('Please provide your country name'),
  // state: string().nonempty('Please provide your state name'),
  city: string().nonempty('Please provide your city name'),
  pin: string().nonempty('Please provide your state pin code'),
  address: string().nonempty('Please provide your address'),
});

export const paymentSchema = object({
  card: string().nonempty('Please provide your card number'),
  // date: date({
  //   required_error: 'Please select a date and time',
  //   invalid_type_error: "That's not a date!",
  // }),
  date: string().nonempty('Please select the date'),
  cvc: string().nonempty('Please provide your cvc code'),
});
