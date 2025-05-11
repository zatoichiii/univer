// src/components/ProductSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Импортируем модули из swiper/modules
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const items = [
  {
    type: 'product',
    _id: '1',
    name: 'Laptop',
    price: 1200,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    type: 'news',
    title: 'Breaking News: New Tech Trends',
    description: 'Discover the latest trends in technology and innovation.',
    link: '/news',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    type: 'promotion',
    title: 'Big Sale: Up to 50% Off!',
    description: 'Limited time offer on selected products.',
    link: '/promotions',
    image: 'https://via.placeholder.com/300x200',
  },
];

const ProductSlider = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Highlights</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item._id || item.title}>
              {item.type === 'product' ? (
                <ProductCard product={item} />
              ) : item.type === 'news' ? (
                <NewsCard news={item} />
              ) : item.type === 'promotion' ? (
                <PromotionCard promotion={item} />
              ) : null}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

// Компонент для карточки продукта
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4 transition-all hover:shadow-lg hover:scale-[1.02]">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h3 className="text-lg font-semibold text-gray-800 mt-4">{product.name}</h3>
      <p className="text-gray-600 mt-2">${product.price}</p>
    </div>
  );
};

// Компонент для карточки новости
const NewsCard = ({ news }) => {
  return (
    <div className="bg-indigo-600 rounded-lg shadow-md overflow-hidden text-center p-4 text-white transition-all hover:bg-indigo-700">
      <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
      <h3 className="text-lg font-bold mt-4">{news.title}</h3>
      <p className="text-sm mt-2">{news.description}</p>
      <a href={news.link} className="mt-4 inline-block text-sm font-medium text-white underline">
        Read More
      </a>
    </div>
  );
};

// Компонент для карточки акции
const PromotionCard = ({ promotion }) => {
  return (
    <div className="bg-yellow-500 rounded-lg shadow-md overflow-hidden text-center p-4 text-gray-800 transition-all hover:bg-yellow-600">
      <img src={promotion.image} alt={promotion.title} className="w-full h-48 object-cover" />
      <h3 className="text-lg font-bold mt-4">{promotion.title}</h3>
      <p className="text-sm mt-2">{promotion.description}</p>
      <a href={promotion.link} className="mt-4 inline-block text-sm font-medium text-gray-900 underline">
        Shop Now
      </a>
    </div>
  );
};

export default ProductSlider;