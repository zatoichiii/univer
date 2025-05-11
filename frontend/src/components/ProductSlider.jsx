// src/components/ProductSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Техника для офиса и дома',
    desc: 'Цены напрямую от производителя',
    link: '/catalog',
    image: 'https://i.pinimg.com/originals/81/18/52/8118522f9824ccd4b8e8b5bfea6f0aed.jpg',
  },
  {
    label: 'Количество акций ограничено',
    title: 'Скидка 5.000 ₽ на первый заказ',
    desc: 'При покупке от 20.000 ₽ в этом месяце',
    link: '/promo',
    image: 'https://tentmarket.ru/upload/cssinliner_webp/iblock/176/08am1letd9p04bguqliqts32rxcgxz3w.webp',
  },
  {
    title: 'Гаджеты оптом',
    desc: 'Выгодные цены при заказе от 10 штук',
    link: '/catalog/gadgets',
    image: 'https://avatars.mds.yandex.net/i?id=d04c6b68d0c18647a1b20211399beb3a_l-10740243-images-thumbs&n=13',
  },
  {
    title: 'Индивидуальные сборки ПК',
    desc: 'Бесплатная сборка под ваш бюджет и задачи',
    button: 'Оставить заявку',
    image: 'https://cdn1.ozone.ru/s3/multimedia-0/6058580244.jpg',
  },
];

const ProductSlider = () => {
  return (
    <section className="main-banner relative bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="relative"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col lg:flex-row items-center bg-white rounded-lg overflow-hidden shadow-lg p-6">
                <div className="lg:w-1/2 text-center lg:text-left space-y-4">
                  {slide.label && (
                    <p className="text-sm uppercase text-red-500 font-medium">{slide.label}</p>
                  )}
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-gray-600 text-lg">{slide.desc}</p>
                  {slide.link ? (
                    <a
                      href={slide.link}
                      className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                      Подробнее
                    </a>
                  ) : (
                    <button
                      className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                      {slide.button || 'Подробнее'}
                    </button>
                  )}
                </div>
                <div className="lg:w-1/2 mt-6 lg:mt-0 flex justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="rounded-lg max-h-[400px] object-cover w-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кастомные стрелки (по желанию можно стилизовать под packplace) */}
        <style>{`
          .swiper-button-prev, .swiper-button-next {
            color: #4f46e5; /* Indigo */
          }
        `}</style>
      </div>
    </section>
  );
};

export default ProductSlider;
