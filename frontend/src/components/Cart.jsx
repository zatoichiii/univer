// src/components/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../redux/slices/cartSlice'; // Убедитесь, что clearCart импортирован

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items); // Получаем товары из Redux
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Ваша корзина</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Ваша корзина пуста.</p>
      ) : (
        <div>
          {/* Список товаров */}
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center bg-white p-4 rounded-md shadow-md">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">{item.price}руб x {item.quantity || 1}</p>
                </div>
                <button
                  onClick={() => dispatch(removeItem(item._id))} // Удаляем товар из корзины
                  className="text-red-500 hover:text-red-700"
                >
                  Убрать
                </button>
              </li>
            ))}
          </ul>

          {/* Общая стоимость */}
          <div className="mt-8 text-right">
          <Link
            to="/checkout"
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Оформить заказ
          </Link>
            <h2 className="text-2xl font-bold text-gray-800">Итого: {totalPrice.toFixed(2)}руб</h2>
          </div>

          {/* Кнопка очистки корзины */}
          <button
            onClick={() => dispatch(clearCart())} // Очищаем корзину
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Очистить корзину
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;