// src/components/AddToCartButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify'; // Импортируем toast

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Предотвращаем действие по умолчанию
    e.stopPropagation(); // Предотвращаем распространение события

    dispatch(addItem(product)); // Добавляем товар в Redux-состояние

    // Показываем уведомление
    toast.success(
      <div>
        <p>{product.name} added to cart!</p>
        <button
          onClick={() => window.location.href = '/cart'} // Переход в корзину
          className="mt-2 inline-block bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Go to Cart
        </button>
      </div>,
      {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;