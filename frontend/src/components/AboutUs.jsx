// src/components/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://avatars.mds.yandex.net/i?id=65b7ccc926d53435ed8deb383edb4d9a4af21468-5234328-images-thumbs&n=13"
              alt="О компании"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">О нашем магазине</h2>
            <p className="text-gray-600 leading-relaxed">
              Мы – команда, которая предоставляет лучшие гаджеты и технику для вашего удобства и комфорта. Наша цель –
              предложить вам самые современные технологии по доступным ценам. Мы тщательно отбираем каждый товар, чтобы
              обеспечить вам высокое качество и надежность.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Каждый день мы работаем над тем, чтобы сделать покупки в нашем магазине удобными и приятными. Будь то
              смартфоны, ноутбуки или аксессуары – у нас есть всё, что нужно для ваших технологий.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
