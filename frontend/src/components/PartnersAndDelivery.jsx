import React from 'react';

const clients = [
  { src: 'https://packplace.me/wp-content/uploads/2024/09/partner-wb.svg', alt: 'wb' },
  { src: 'https://packplace.me/wp-content/uploads/2024/09/partner-ozon.svg', alt: 'ozon' },
  { src: 'https://packplace.me/wp-content/uploads/2024/09/partner-yandex.svg', alt: 'Яндекс Маркет' },
  { src: 'https://packplace.me/wp-content/uploads/2024/09/partner-lamoda.svg', alt: 'lamoda' },
  { src: 'https://packplace.me/wp-content/uploads/2024/09/partner-mir.svg', alt: 'Детский мир' },
  { src: 'https://packplace.me/wp-content/uploads/2024/12/megamarket.png', alt: 'Мегамаркет' },
];

const delivery = [
  { src: 'https://packplace.me/wp-content/uploads/2024/09/delivery-sdek.svg', alt: 'СДЭК' },
  { src: 'https://packplace.me/wp-content/uploads/2024/09/delivery-pek.svg', alt: 'Пэк' },
  { src: 'https://packplace.me/wp-content/uploads/2024/09/delivery-lines.webp', alt: 'Деловые линии' },
  { src: 'https://packplace.me/wp-content/uploads/2024/09/delivery-baikal.svg', alt: 'Байкал Сервис' },
  { src: 'https://packplace.me/wp-content/uploads/2024/09/delivery-yandex-1.svg', alt: 'Яндекс Доставка' },
  { src: 'https://packplace.me/wp-content/uploads/2024/09/delivery-sam.svg', alt: 'Самовывоз' },
];

const ImageGrid = ({ title, items }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center justify-center">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center justify-center p-2">
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="h-12 object-contain"
          />
        </li>
      ))}
    </ul>
  </div>
);

const PartnersAndDelivery = () => {
  return (
    <section className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <ImageGrid title="Наши клиенты представлены на..." items={clients} />
          <ImageGrid title="Способы доставки" items={delivery} />
        </div>
      </div>
    </section>
  );
};

export default PartnersAndDelivery;
