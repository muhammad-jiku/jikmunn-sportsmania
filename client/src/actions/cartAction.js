//  external import
import axios from 'axios';
//  internal imports
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from '../constants/cartConstant';

// Add Item to the Cart
export const addItemsToCart =
  (id, size, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    await dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data?.product?._id,
        name: data?.product?.name,
        price: data?.product?.price,
        stock: data?.product?.stock,
        image: data?.product?.images[0]?.url,
        size,
        quantity,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

// Remove Item from the Cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  await dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Saving Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
  await dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem('shippingInfo', JSON.stringify(data));
};
