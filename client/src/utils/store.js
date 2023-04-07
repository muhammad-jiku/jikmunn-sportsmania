import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productsReducer,
  productDetailsReducer,
  productReviewsReducer,
  newReviewReducer,
} from '../reducers/productReducer';
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from '../reducers/userReducer';
import { cartReducer } from '../reducers/cartReducer';

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  // allUsers: allUsersReducer,
  // userDetails: userDetailsReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  // newProduct: newProductReducer,
  // product: productReducer,
  cart: cartReducer,
  // newOrder: newOrderReducer,
  // myOrders: myOrdersReducer,
  // orderDetails: orderDetailsReducer,
  // allOrders: allOrdersReducer,
  // order: orderReducer,
  newReview: newReviewReducer,
  productReviews: productReviewsReducer,
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
