// server.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// Импорт зависимостей
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sendMail = require('./sendMail');
const multer = require('multer'); // Импортируем multer

// Инициализация Express-приложения
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Настройка Multer для сохранения файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Папка для сохранения файлов
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Уникальное имя файла
  },
});

const upload = multer({ storage });

// Создаем папку public/uploads, если её нет
const fs = require('fs');
const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Эндпоинт для отправки email
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendMail(name, email, message);
    res.status(200).send('Сообщение отправлено');
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    res.status(500).send('Не удалось отправить сообщение');
  }
});


// Эндпоинт для загрузки изображений
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    const fileUrl = `/uploads/${req.file.filename}`; // Формируем URL файла
    res.status(200).json({ url: fileUrl }); // Возвращаем URL клиента
  } catch (error) {
    res.status(500).json({ message: 'File upload failed' });
  }
});

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

  const authRoutes = require('./routes/auth');
  const productRoutes = require('./routes/products');
  const userRoutes = require('./routes/users'); // Импортируем маршруты для пользователей
  
  // Подключение маршрутов
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes); // Подключаем маршруты для пользователей

// Служба статических файлов
app.use(express.static('public'));

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));