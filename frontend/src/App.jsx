// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadUser } from './redux/slices/authSlice';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import AboutPage from './pages/AboutPage'
import AllProductsPage from './pages/AllProductsPage';
import { ToastContainer } from 'react-toastify'; // Импортируем ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Стили для toast
import './index.css';

function App() {
  const dispatch = useDispatch();

  // Загружаем данные пользователя при запуске приложения
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Хедер */}
        <Header />

        {/* Основной контент */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route path="/about" element={<AboutPage  />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Футер */}
        <Footer />

        {/* ToastContainer для уведомлений */}
        <ToastContainer
          position="bottom-right" // Позиция уведомлений
          autoClose={3000} // Время закрытия (в миллисекундах)
          hideProgressBar={false} // Показать прогресс-бар
          newestOnTop={true} // Новые уведомления сверху
          closeOnClick // Закрытие при клике
          rtl={false} // Отключаем RTL (right-to-left)
          pauseOnFocusLoss // Пауза при потере фокуса
          draggable // Возможность перетаскивать уведомления
          pauseOnHover // Пауза при наведении
        />
      </div>
    </Router>
  );
}

export default App;