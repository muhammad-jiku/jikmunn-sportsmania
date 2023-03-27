import axios from 'axios';
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstant';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Get All Products (also with search, filter)
export const getProducts =
  (
    keyword = '',
    currentPage = 1,
    priceRange = [0, 500],
    category,
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      await dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      let link = `/api/v1/products?page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte]=${ratings}`;

      if (keyword) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte]=${ratings}`;
      }

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      await dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      await dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {};

// Create Product
export const createProduct = (productData) => async (dispatch) => {};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {};
