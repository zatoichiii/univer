// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 Premium Store. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-indigo-500">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-500">Terms of Service</a>
          <a href="#" className="hover:text-indigo-500">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;