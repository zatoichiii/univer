// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';

// Middleware для автоматической авторизации
const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === 'auth/login' || action.type === 'auth/logout') {
    const state = store.getState();
    if (state.auth.isAuthenticated) {
      localStorage.setItem('token', state.auth.token); // Сохраняем токен
    } else {
      localStorage.removeItem('token'); // Удаляем токен
    }
  }
  return result;
};

// Проверка токена при загрузке приложения
const loadAuthFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { user: { username: 'User' }, token, isAuthenticated: true }; // Временный пользователь
  }
  return { user: null, token: null, isAuthenticated: false };
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState: {
    auth: loadAuthFromLocalStorage(), // Загружаем состояние авторизации из localStorage
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});