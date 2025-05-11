// src/components/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import ProductSlider from '../components/ProductSlider';
import ProductList from '../components/ProductList';
import AboutUs from '../components/AboutUs';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ProductSlider />
      <h2 className="text-3xl font-bold text-center text-gray-800 my-8">All Products</h2>
      <ProductList />
      <AboutUs />
      <ContactForm />
    </>
  );
};

export default HomePage;