const nodemailer = require('nodemailer');

// Создаем транспорт для отправки почты через Яндекс.Почту
const transporter = nodemailer.createTransport({
  service: 'yandex',
  auth: {
    user: process.env.YANDEX_EMAIL,
    pass: process.env.YANDEX_PASSWORD,
  },
});

// Функция отправки email
const sendMail = (name, email, message) => {
  const mailOptions = {
    from: process.env.YANDEX_EMAIL, // Отправитель
    to: 'azovtsevnikita@mail.ru', // Замените на ваш email для получения сообщений
    subject: 'Новое сообщение с сайта',
    text: `
      Имя: ${name}
      Email: ${email}
      Сообщение: ${message}
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
