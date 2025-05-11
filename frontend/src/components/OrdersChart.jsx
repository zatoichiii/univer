// src/components/OrdersChart.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Пример данных
const data = [
  { month: 'Янв', value: 5000 },
  { month: 'Фев', value: 4500 },
  { month: 'Мар', value: 9000 },
  { month: 'Апр', value: 7000 },
  { month: 'Май', value: 12000 },
  { month: 'Июн', value: 8500 },
];

const maxValue = Math.max(...data.map(d => d.value));
const scaleValue = (val) => (val / maxValue) * 100;

const OrdersChart = () => {
  return (
    <div className="relative h-48 w-full">
      <svg width="100%" height="100%">
        {data.map((item, index) => (
          <motion.rect
            key={index}
            x={`${(index / data.length) * 100}%`}
            y={`${100 - scaleValue(item.value)}%`}
            width="20"
            height={`${scaleValue(item.value)}%`}
            fill="#6366F1"
            initial={{ height: 0 }}
            animate={{ height: `${scaleValue(item.value)}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        ))}
      </svg>

      <div className="flex justify-between text-xs absolute bottom-0 left-0 w-full px-2 text-gray-600">
        {data.map((d, i) => (
          <span key={i}>{d.month}</span>
        ))}
      </div>
    </div>
  );
};

export default OrdersChart;