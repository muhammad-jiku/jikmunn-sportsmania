import React, { useEffect, useState } from 'react';
//  external imports
import axios from 'axios';
import { Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Route, Routes } from 'react-router-dom';
//  internal imports
import './App.css';
import { sportsStore } from './utils/store';
import { loadUser } from './actions/userAction';
import { Navbar, Footer } from './components/Shared';
import { ForgetPassword, ResetPassword } from './components/Auth';
import { RequiredAdmin, RequiredAuth } from './components/Protected';
import { handleDisableRightClick } from './utils/handleDisableRightClick';
import {
  HomePage,
  // ContactPage,
  // AboutPage,
  LoginPage,
  ProductPage,
  ProductDetailsPage,
  MyCarts,
  ShippingPage,
  ConfirmOrderPage,
  PaymentPage,
  SuccessPage,
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
} from './pages';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

  // console.log('server side uri = ', axios.defaults.baseURL);
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
    sportsStore.dispatch(loadUser());
    getStripeApiKey();

    // disable right click
    document.addEventListener('contextmenu', handleDisableRightClick);

    // enable right click
    // document.removeEventListener('contextmenu', handleDisableRightClick);
  }, []);

  return (
    <Box className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route
          path='/product/:id'
          element={
            <RequiredAuth>
              <ProductDetailsPage />
            </RequiredAuth>
          }
        />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/password/forgot' element={<ForgetPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route
          path='/carts'
          element={
            <RequiredAuth>
              <MyCarts />
            </RequiredAuth>
          }
        />
        <Route
          path='/shipping'
          element={
            <RequiredAuth>
              <ShippingPage />
            </RequiredAuth>
          }
        />
        <Route
          path='/order/confirm'
          element={
            <RequiredAuth>
              <ConfirmOrderPage />
            </RequiredAuth>
          }
        />
        <Route
          path='/success'
          element={
            <RequiredAuth>
              <SuccessPage />
            </RequiredAuth>
          }
        />
        {stripeApiKey ? (
          <Route
            path='/process/payment'
            element={
              <RequiredAuth>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <PaymentPage />
                </Elements>
              </RequiredAuth>
            }
          />
        ) : null}
        <Route
          path='/dashboard'
          element={
            <RequiredAuth>
              <MyDashboard />
            </RequiredAuth>
          }
        >
          <Route
            index
            element={
              <RequiredAuth>
                <MyProfile />
              </RequiredAuth>
            }
          />
          <Route
            path='password/secure'
            element={
              <RequiredAuth>
                <SecureMyProfile />
              </RequiredAuth>
            }
          />
          <Route
            path='admin'
            element={
              <RequiredAdmin>
                <AdminPanelPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/users'
            element={
              <RequiredAdmin>
                <AllUsersPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/user/update/:id'
            element={
              <RequiredAdmin>
                <UpdateUserPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/products'
            element={
              <RequiredAdmin>
                <AllProductsPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/product/new'
            element={
              <RequiredAdmin>
                <NewProductPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/product/update/:id'
            element={
              <RequiredAdmin>
                <UpdateProductPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/product/reviews/:id'
            element={
              <RequiredAdmin>
                <AllProductReviewsPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/orders'
            element={
              <RequiredAdmin>
                <AllOrdersPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/order/:id'
            element={
              <RequiredAdmin>
                <ProcessOrderPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='myorders'
            element={
              <RequiredAuth>
                <MyOrders />
              </RequiredAuth>
            }
          />
          <Route
            path='myorders/:id'
            element={
              <RequiredAuth>
                <MyOrderDetails />
              </RequiredAuth>
            }
          />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
