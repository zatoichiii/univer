// src/components/Contacts.jsx
import React from 'react';

const Contacts = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Контакты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="font-semibold mr-3">Телефон:</span>
                <a
                  href="tel:+78001234567"
                  className="text-indigo-600 hover:underline"
                  itemProp="telephone"
                >
                  +7 (800) 123-45-67
                </a>
              </li>
              <li className="flex items-center">
                <span className="font-semibold mr-3">E-mail:</span>
                <a
                  href="mailto:support@techstore.com"
                  className="text-indigo-600 hover:underline"
                  itemProp="email"
                >
                  support@techstore.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="font-semibold mr-3">Время работы:</span>
                <span>Пн-Пт: 09:00 – 18:00</span>
              </li>
              <li className="flex items-center">
                <span className="font-semibold mr-3">Адрес компании:</span>
                <span>г. Москва, ул. Технопарковая, д. 10</span>
              </li>
              <li className="flex items-center">
                <span className="font-semibold mr-3">Адрес склада:</span>
                <span>МО, г. Химки, ул. Промышленная, д. 5</span>
              </li>
            </ul>
            <button
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => alert('Форма заявки будет открыта')}
            >
              Оставить заявку
            </button>
          </div>
          <div>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A1a10c564738f6e7c4823069e4d062a01b50cfc79a5f7f827d9bada56a824b16a&amp;source=constructor"
              width="100%"
              height="400"
              loading="lazy"
              title="Наши контакты"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
