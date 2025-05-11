import React from 'react';

const advantages = [
  {
    icon: 'https://packplace.me/wp-content/uploads/2024/09/icon-delivery.svg',
    text: 'Быстрая доставка по всей России',
  },
  {
    icon: 'https://packplace.me/wp-content/uploads/2024/09/icon-price.svg',
    text: 'Конкурентные цены от поставщика',
  },
  {
    icon: 'https://packplace.me/wp-content/uploads/2024/09/icon-order.svg',
    text: 'Персональный подбор техники под заказ',
  },
  {
    icon: 'https://packplace.me/wp-content/uploads/2024/09/icon-pack.svg',
    text: 'Более 10,000 довольных клиентов',
  },
];

const StoreAdvantages = () => {
  return (
    <section className="bg-white py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {advantages.map((adv, idx) => (
            <li key={idx} className="flex flex-col items-center">
              <img
                src={adv.icon}
                alt={adv.text}
                className="w-12 h-12 mb-3"
                loading="lazy"
                style={{ filter: 'hue-rotate(74deg)' }}
              />
              <span className="text-gray-700 text-sm font-medium">{adv.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StoreAdvantages;
