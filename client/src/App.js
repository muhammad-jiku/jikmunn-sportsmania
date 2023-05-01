import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import './App.css';
import { Navbar, Footer } from './components/Shared';
import {
  HomePage,
  ProductPage,
  ProductDetailsPage,
  // ContactPage,
  // AboutPage,
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
  AllProductReviewsPage,
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
import { Box } from '@mui/material';
import { RequiredAdmin, RequiredAuth } from './components/Protected';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
  console.log('server side uri = ', axios.defaults.baseURL);
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
    <Box className="App">
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route
          path="/product/:id"
          element={
            <RequiredAuth isAuthenticated={isAuthenticated}>
              <ProductDetailsPage user={user} />
            </RequiredAuth>
          }
        />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password/forgot" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/carts"
          element={
            <RequiredAuth isAuthenticated={isAuthenticated}>
              <MyCarts />
            </RequiredAuth>
          }
        />
        <Route
          path="/shipping"
          element={
            <RequiredAuth isAuthenticated={isAuthenticated}>
              <ShippingPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <RequiredAuth isAuthenticated={isAuthenticated}>
              <ConfirmOrderPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/success"
          element={
            <RequiredAuth isAuthenticated={isAuthenticated}>
              <SuccessPage />
            </RequiredAuth>
          }
        />
        {stripeApiKey ? (
          <Route
            path="/process/payment"
            element={
              <RequiredAuth isAuthenticated={isAuthenticated}>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <PaymentPage />
                </Elements>
              </RequiredAuth>
            }
          />
        ) : null}
        <Route
          path="/dashboard"
          element={
            <RequiredAuth isAuthenticated={isAuthenticated}>
              <MyDashboard />
            </RequiredAuth>
          }
        >
          <Route
            index
            element={
              <RequiredAuth isAuthenticated={isAuthenticated}>
                <MyProfile />
              </RequiredAuth>
            }
          />
          <Route
            path="password/secure"
            element={
              <RequiredAuth isAuthenticated={isAuthenticated}>
                <SecureMyProfile />
              </RequiredAuth>
            }
          />
          <Route
            path="admin"
            element={
              <RequiredAdmin user={user}>
                <AdminPanelPage />
              </RequiredAdmin>
            }
          />
          <Route
            path="admin/users"
            element={
              <RequiredAdmin user={user}>
                <AllUsersPage />
              </RequiredAdmin>
            }
          />
          <Route
            path="admin/user/update/:id"
            element={
              <RequiredAdmin user={user}>
                <UpdateUserPage />
              </RequiredAdmin>
            }
          />
          <Route
            path="admin/products"
            element={
              <RequiredAdmin user={user}>
                <AllProductsPage />
              </RequiredAdmin>
            }
          />
          <Route
            path="admin/product/new"
            element={
              <RequiredAdmin user={user}>
                <NewProductPage />
              </RequiredAdmin>
            }
          />
          <Route
            path="admin/product/update/:id"
            element={
              <RequiredAdmin user={user}>
                <UpdateProductPage />
              </RequiredAdmin>
            }
          />
          <Route
            path="admin/product/reviews/:id"
            element={
              <RequiredAdmin user={user}>
                <AllProductReviewsPage />
              </RequiredAdmin>
            }
          />
          <Route
            path="admin/orders"
            element={
              <RequiredAdmin user={user}>
                <AllOrdersPage />
              </RequiredAdmin>
            }
          />
          <Route
            path="admin/order/:id"
            element={
              <RequiredAdmin user={user}>
                <ProcessOrderPage />
              </RequiredAdmin>
            }
          />
          <Route
            path="myorders"
            element={
              <RequiredAuth isAuthenticated={isAuthenticated}>
                <MyOrders />
              </RequiredAuth>
            }
          />
          <Route
            path="myorders/:id"
            element={
              <RequiredAuth isAuthenticated={isAuthenticated}>
                <MyOrderDetails />
              </RequiredAuth>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
