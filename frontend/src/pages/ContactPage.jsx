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

const ContactPage = () => {
  return (
    <>
      <Contacts/>
      <ContactForm />
    </>
  );
};

export default ContactPage;
