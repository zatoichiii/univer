// src/components/YandexMap.jsx
import React, { useEffect, useRef } from 'react';

const YandexMap = ({ onSelect }) => {
  const mapRef = useRef(null); // Ссылка на DOM-элемент карты
  const initialized = useRef(false); // Флаг для предотвращения повторной инициализации

  useEffect(() => {
    // Проверяем, загружен ли уже API Яндекс.Карт
    if (window.ymaps && !initialized.current) {
      initMap();
    } else if (!initialized.current) {
      loadYandexScript().then(() => {
        window.ymaps.ready(initMap);
      });
    }

    return () => {
      // Очистка при размонтировании (необязательно, но можно)
      initialized.current = true;
    };
  }, []);

  // Функция для загрузки скрипта Яндекс.Карт
  const loadYandexScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey= ВАШ_КЛЮЧ&lang=ru_RU`;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  // Инициализация карты
  const initMap = () => {
    if (initialized.current) return;

    const map = new window.ymaps.Map(mapRef.current, {
      center: [55.751574, 37.573856], // Москва по умолчанию
      zoom: 10,
    });

    initialized.current = true;

    // По клику ставим метку и передаем координаты
    map.events.add('click', (e) => {
      const coords = e.get('coords');
      map.geoObjects.removeAll();
      map.geoObjects.add(new window.ymaps.Placemark(coords));
      onSelect(coords);
    });
  };

  return (
    <div>
      <div
        ref={mapRef}
        id="map"
        style={{ width: '100%', height: '300px' }}
      ></div>
    </div>
  );
};

export default YandexMap;