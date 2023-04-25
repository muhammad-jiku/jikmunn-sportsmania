import axios from 'axios';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from '../constants/cartConstant';

// Add to Cart
export const addItemsToCart =
  (id, size, quantity) => async (dispatch, getState) => {
    console.log(id, size, quantity);
    const { data } = await axios.get(`/api/v1/product/${id}`);
    console.log(data);
    dispatch({
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

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  // console.log(data);
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem('shippingInfo', JSON.stringify(data));
};
