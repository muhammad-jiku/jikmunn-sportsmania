import axios from 'axios';
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from '../constants/userConstant';

// Login
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: { 'content-type': 'application/json' },
    };

    const { data } = await axios.post(`/api/v1/login`, userData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Register
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const config = {
      headers: { 'content-type': 'application/json' },
    };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {};

// Logout User
export const logout = () => async (dispatch) => {};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {};

// get All Users
export const getAllUsers = () => async (dispatch) => {};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {};

// Delete User
export const deleteUser = (id) => async (dispatch) => {};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {};
