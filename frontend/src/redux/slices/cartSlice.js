// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Загрузка данных корзины из localStorage
const loadCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem('cart');
  return cartItems ? JSON.parse(cartItems) : [];
};

const initialState = {
  items: loadCartFromLocalStorage(), // Инициализация состояния из localStorage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1; // Увеличиваем количество
      } else {
        state.items.push({ ...item, quantity: 1 }); // Добавляем новый товар
      }

      // Сохраняем состояние корзины в localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);

      // Сохраняем состояние корзины в localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = []; // Очищаем корзину

      // Очищаем localStorage
      localStorage.removeItem('cart');
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;