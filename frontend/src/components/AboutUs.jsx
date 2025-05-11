// src/components/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://via.placeholder.com/600x400"
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Our Store</h2>
            <p className="text-gray-600 leading-relaxed">
              We are a premium tech store dedicated to providing the latest gadgets and technology at affordable prices.
              Our mission is to make cutting-edge technology accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;