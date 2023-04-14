import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import './App.css';
import { Navbar, Footer, Loader } from './components/Shared';
import {
  HomePage,
  ProductPage,
  ProductDetailsPage,
  ContactPage,
  AboutPage,
  LoginPage,
  MyCarts,
  ShippingPage,
  ConfirmOrderPage,
  MyDashboard,
  MyProfile,
  SecureMyProfile,
  AdminPanelPage,
  AllUsersPage,
  UpdateUserPage,
  AllProductsPage,
  NewProductPage,
  UpdateProductPage,
  AllOrdersPage,
  ProcessOrderPage,
  MyOrders,
  MyOrderDetails,
  NotFoundPage,
  PaymentPage,
  SuccessPage,
} from './pages';
import { sportsStore } from './utils/store';
import WebFont from 'webfontloader';
import { ForgetPassword, ResetPassword } from './components/Auth';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
  console.log(axios.defaults.baseURL);
  const getStripeApiKey = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get('/api/v1/stripeapikey', config);
    setStripeApiKey(data?.stripeApiKey);
  };

  useEffect(() => {
    // console.log(axios.defaults.baseURL);
    // console.log(stripeApiKey);
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    sportsStore.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      {/* {loading ? // <Loader />
      null : ( */}
      <>
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/password/forgot" element={<ForgetPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/carts" element={<MyCarts />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/order/confirm" element={<ConfirmOrderPage />} />
          <Route path="/success" element={<SuccessPage />} />
          {stripeApiKey ? (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <PaymentPage />
                </Elements>
              }
            />
          ) : null}
          <Route
            path="/dashboard"
            element={
              // <RequiredAuth>
              <MyDashboard />
              // </RequiredAuth>
            }
          >
            <Route index element={<MyProfile />} />
            <Route path="password/secure" element={<SecureMyProfile />} />
            <Route path="admin" element={<AdminPanelPage />} />
            <Route path="admin/users" element={<AllUsersPage />} />
            <Route path="admin/user/update/:id" element={<UpdateUserPage />} />
            <Route path="admin/products" element={<AllProductsPage />} />
            <Route path="admin/product/new" element={<NewProductPage />} />
            <Route
              path="admin/product/update"
              element={<UpdateProductPage />}
            />
            <Route path="admin/orders" element={<AllOrdersPage />} />
            <Route path="admin/order/:id" element={<ProcessOrderPage />} />
            <Route path="myorders" element={<MyOrders />} />
            <Route path="myorders/:id" element={<MyOrderDetails />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </>
      {/* )} */}
    </div>
  );
}

export default App;
