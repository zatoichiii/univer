// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Текст */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Премиальная электроника <br /> для дома и бизнеса
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Топовые гаджеты, ноутбуки и аксессуары по выгодным ценам. Гарантия качества и быстрая доставка.
          </p>
          <a
            href="/catalog"
            className="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Перейти в каталог
          </a>
        </div>

        {/* Изображение */}
        <div className="lg:w-1/2 flex justify-center">
        <svg width="50%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="12" fill="url(#gradient)"/>
  <path d="M20 24L32 16L44 24V40L32 48L20 40V24Z" stroke="white" stroke-width="2" fill="#1e3a8a"/>
  <circle cx="32" cy="32" r="8" fill="gold"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
</svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
