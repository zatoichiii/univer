// src/components/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import OrdersChart from './OrdersChart'; // График
import OrdersTable from './OrdersTable';   // Таблица

const Dashboard = () => {
  const user = {
    username: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    joinDate: '11.05.2025'
  };

  const totalOrders = 12;
  const totalSpent = 87500;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Заголовок */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Личный кабинет</h1>

      {/* Информация о пользователе */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Телефон: {user.phone}</p>
          <p className="text-gray-500 text-sm mt-1">Зарегистрирован: {user.joinDate}</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Выйти
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Общая статистика</h3>
          <ul className="space-y-2">
            <li>📦 Количество заказов: <span className="font-medium">{totalOrders}</span></li>
            <li>💰 Общая сумма покупок: <span className="font-medium">{totalSpent.toLocaleString()} ₽</span></li>
            <li>⭐ Средний рейтинг товаров: <span className="font-medium">4.7</span></li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Активность</h3>
          <OrdersChart />
        </div>
      </div>

      {/* История заказов */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">История заказов</h3>
        <OrdersTable />
      </div>

      {/* Рекомендации */}
      <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 p-4 rounded-r">
        <p className="font-semibold">Рекомендуем вам:</p>
        <ul className="list-disc ml-5 mt-2">
          <li>Новые поступления: беспроводные наушники AirSound Pro</li>
          <li>Скидка 20% на всё для постоянных клиентов</li>
          <li>Подписка на рассылку с эксклюзивными предложениями</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;