import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Подключаем React-плагин
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // Добавляем плагин React
    tailwindcss(), // Оставляем TailwindCSS
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Сервер бэкенда
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Убираем /api из пути
      },
    },
  },
});