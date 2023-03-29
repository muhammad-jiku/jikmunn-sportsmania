import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productsReducer,
  productDetailsReducer,
} from '../reducers/productReducer';
import { userReducer } from '../reducers/userReducer';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  // profile: profileReducer,
  // forgotPassword: forgotPasswordReducer,
  // cart: cartReducer,
  // newOrder: newOrderReducer,
  // myOrders: myOrdersReducer,
  // orderDetails: orderDetailsReducer,
  // newReview: newReviewReducer,
  // newProduct: newProductReducer,
  // product: productReducer,
  // allOrders: allOrdersReducer,
  // order: orderReducer,
  // allUsers: allUsersReducer,
  // userDetails: userDetailsReducer,
  // productReviews: productReviewsReducer,
  // review: reviewReducer,
});

let initialState = {
  cart: {},
};

const middleware = [thunk];

export const sportsStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
