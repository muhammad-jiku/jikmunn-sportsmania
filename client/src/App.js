import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Shared/Navbar/Navbar';
import {
  AboutPage,
  ContactPage,
  HomePage,
  LoginPage,
  ProductsPage,
} from './pages';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
