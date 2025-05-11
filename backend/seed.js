// backend/seed.js
require('dotenv').config(); // Загрузка переменных окружения

const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Laptop',
    price: 1200,
    description: 'A powerful laptop for work and gaming.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Smartphone',
    price: 800,
    description: 'A sleek smartphone with advanced features.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Headphones',
    price: 150,
    description: 'High-quality noise-cancelling headphones.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Keyboard',
    price: 100,
    description: 'Mechanical keyboard for gaming and typing.',
    image: 'https://via.placeholder.com/150',
  },
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await Product.deleteMany(); // Очистка коллекции перед добавлением новых данных
    await Product.insertMany(products); // Добавление тестовых данных
    console.log('Database seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));