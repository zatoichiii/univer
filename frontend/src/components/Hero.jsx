// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-indigo-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Premium Tech Store</h1>
        <p className="text-xl mb-8">Discover the latest gadgets and technology at unbeatable prices.</p>
        <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;