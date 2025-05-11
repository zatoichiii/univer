// src/components/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import ProductSlider from '../components/ProductSlider';
import ProductList from '../components/ProductList';
import AboutUs from '../components/AboutUs';
import ContactForm from '../components/ContactForm';
import StoreAdvantages from '../components/StoreAdvantages';
import PartnersAndDelivery from '../components/PartnersAndDelivery';
import Contacts from '../components/Contacts';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ProductSlider />
      <StoreAdvantages />
      <ProductList />
      <PartnersAndDelivery /> 
      <AboutUs />
      <Contacts/>
      <ContactForm />
    </>
  );
};

export default HomePage;
