import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Navbar } from './components/Shared';
import {
  AboutPage,
  ContactPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProductsPage,
} from './pages';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
