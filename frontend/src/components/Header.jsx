// src/components/Header.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b">
      {/* Верхняя панель с контактами */}
      <div className="bg-gray-100 text-sm text-gray-700 px-4 py-2 flex justify-between items-center">
        <span>+7 (999) 123-45-67</span>
        <span>store@example.com</span>
      </div>

      {/* Навигация */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Логотип */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a to="/" className="text-2xl font-bold text-indigo-700 tracking-wide">
            TechStore
          </a>
        </motion.div>

        {/* Меню */}
        <div className="flex space-x-6 items-center font-medium">
          <Link
            to="/"
            whileHover={{ scale: 1.05 }}
            className="text-gray-700 hover:text-indigo-600"
          >
            Главная
          </Link>
          <Link
            to="/all-products"
            whileHover={{ scale: 1.05 }}
            className="text-gray-700 hover:text-indigo-600"
          >
            Каталог
          </Link>
          <Link
            to="/about"
            whileHover={{ scale: 1.05 }}
            className="text-gray-700 hover:text-indigo-600"
          >
            О нас
          </Link>
          <Link
            to="/contacts"
            whileHover={{ scale: 1.05 }}
            className="text-gray-700 hover:text-indigo-600"
          >
            Контакты
          </Link>
          <Link
            to="/cart"
            whileHover={{ scale: 1.05 }}
            className="text-gray-700 hover:text-indigo-600"
          >
            Корзина
          </Link>

          {/* Авторизация */}
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                whileHover={{ scale: 1.05 }}
                className="text-gray-700 hover:text-indigo-600"
              >
                {user?.username}
              </Link>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                className="text-red-500 hover:text-red-700"
              >
                Выйти
              </motion.button>
            </>
          ) : (
            <Link
              to="/login"
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 hover:text-indigo-600"
            >
              Войти
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
