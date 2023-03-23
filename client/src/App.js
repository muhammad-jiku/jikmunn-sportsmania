import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, Footer } from './components/Shared';
import {
  HomePage,
  ProductPage,
  ProductDetailsPage,
  ContactPage,
  AboutPage,
  LoginPage,
  NotFoundPage,
} from './pages';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
