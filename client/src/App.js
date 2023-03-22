import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, Footer } from './components/Shared';
import {
  HomePage,
  ContactPage,
  AboutPage,
  ProductPage,
  LoginPage,
  NotFoundPage,
} from './pages';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
