// src/components/OrdersTable.jsx
import React from 'react';

// Пример истории заказов
const orders = [
  { id: '#1001', date: '12.01.2024', amount: '5000 ₽', status: 'Доставлен' },
  { id: '#1005', date: '18.02.2024', amount: '7500 ₽', status: 'Ожидает оплаты' },
  { id: '#1012', date: '05.03.2024', amount: '9000 ₽', status: 'В пути' },
  { id: '#1023', date: '22.04.2024', amount: '12000 ₽', status: 'Доставлен' },
];

const OrdersTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Номер заказа</th>
            <th className="px-4 py-2 text-left">Дата</th>
            <th className="px-4 py-2 text-left">Сумма</th>
            <th className="px-4 py-2 text-left">Статус</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.date}</td>
              <td className="px-4 py-2 font-medium">{order.amount}</td>
              <td className="px-4 py-2">
                <span className={`inline-block px-2 py-1 rounded text-xs ${
                  order.status === 'Доставлен' ? 'bg-green-100 text-green-700' :
                  order.status === 'В пути' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;