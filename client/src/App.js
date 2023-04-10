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
    axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
    console.log(axios.defaults.baseURL);
    console.log(stripeApiKey);
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    sportsStore.dispatch(loadUser());
    getStripeApiKey();
  }, [stripeApiKey]);

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
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <PaymentPage />
                </Elements>
              }
            />
          )}
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
