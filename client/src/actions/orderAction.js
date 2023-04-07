import axios from 'axios';
import {
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
} from '../constants/orderConstant';

// Create Order
export const createOrder = (order) => async (dispatch) => {};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_ORDERS_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get('/api/v1/orders/me', config);

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {};
