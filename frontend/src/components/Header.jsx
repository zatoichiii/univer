// src/components/Header.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Импортируем useDispatch
import { motion } from 'framer-motion';
import { logout } from '../redux/slices/authSlice'; // Импортируем действие logout

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch(); // Инициализируем useDispatch

  const handleLogout = () => {
    dispatch(logout()); // Вызываем действие logout
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Логотип */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-indigo-600">Premium Store</h1>
        </motion.div>

        {/* Навигация */}
        <div className="flex space-x-4 items-center">
          <motion.a
            href="/"
            className="text-gray-700 hover:text-indigo-600 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            Home
          </motion.a>
          <motion.a
            href="/cart"
            className="text-gray-700 hover:text-indigo-600 transition-colors relative"
            whileHover={{ scale: 1.1 }}
          >
            Cart
          </motion.a>
          {isAuthenticated ? (
            <>
              <span className="text-gray-800 font-semibold">{user?.username}</span>
              <motion.button
                onClick={handleLogout} // Обрабатываем выход
                className="text-red-500 hover:text-red-700 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.a
              href="/login"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              Login
            </motion.a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;