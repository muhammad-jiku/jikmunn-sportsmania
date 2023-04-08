import React, { useEffect } from 'react';
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
  NotFoundPage,
} from './pages';
import { sportsStore } from './utils/store';
import WebFont from 'webfontloader';
import {
  Dashboard,
  Profile,
  SecureProfile,
  Orders,
  OrderDetails,
} from './components/Dashboard';
import { ForgetPassword, ResetPassword } from './components/Auth';

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    sportsStore.dispatch(loadUser());
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
          <Route
            path="/dashboard"
            element={
              // <RequiredAuth>
              <Dashboard />
              // </RequiredAuth>
            }
          >
            <Route index element={<Profile />} />
            <Route path="password/secure" element={<SecureProfile />} />
            <Route path="myorders" element={<Orders />} />
            <Route path="myorders/:id" element={<OrderDetails />} />
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
