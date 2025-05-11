// src/components/Checkout.jsx
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearCart } from '../redux/slices/cartSlice';
import YandexMap from './YandexMap';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const mapInstance = useRef(null); // Для хранения методов карты

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMapReady = (geocodeFunction) => {
    mapInstance.current = geocodeFunction;
  };

  const handleAddressBlur = () => {
    if (formData.address && mapInstance.current) {
      mapInstance.current(formData.address);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customer: formData.name,
      phone: formData.phone,
      address: formData.address,
      comment: formData.comment,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        total: item.price * (item.quantity || 1)
      })),
      totalPrice: cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0),
      location: selectedLocation
    };

    try {
      await axios.post('http://localhost:5000/api/send-email', {
        name: formData.name,
        email: formData.phone,
        message: `
          Новый заказ!

          Имя: ${formData.name}
          Телефон: ${formData.phone}
          Адрес: ${formData.address}
          Комментарий: ${formData.comment}

          Товары:
          ${cartItems.map(i => `${i.name} x${i.quantity || 1} — $${i.price * (i.quantity || 1)}`).join('\n')}

          Общая сумма: $${orderData.totalPrice.toFixed(2)}
          Координаты: ${selectedLocation ? selectedLocation.join(', ') : 'Не указано'}
        `
      });

      dispatch(clearCart());
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Оформление заказа</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-red-500">Ваша корзина пуста.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Личные данные */}
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Телефон</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Адрес доставки</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleAddressBlur}
                placeholder="Введите адрес для поиска на карте"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Комментарий к заказу</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              ></textarea>
            </div>

            {/* Карта */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Выберите адрес на карте:</h3>
              <YandexMap onSelect={(coords) => {
                setSelectedLocation(coords);
              }} onReady={handleMapReady} />
            </div>

            {/* Кнопка отправки */}
            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Оформить заказ
            </button>
          </div>
        </form>
      )}

      {/* Сообщения об успехе/ошибке */}
      {isSubmitted && (
        <div className="mt-6 text-center text-green-600 font-bold">
          Заказ успешно оформлен! Мы свяжемся с вами.
        </div>
      )}
      {isError && (
        <div className="mt-6 text-center text-red-600 font-bold">
          Произошла ошибка. Попробуйте ещё раз.
        </div>
      )}
    </div>
  );
};

export default Checkout;