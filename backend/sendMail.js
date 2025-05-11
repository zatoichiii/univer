const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'yandex',
  auth: {
    user: process.env.YANDEX_EMAIL,
    pass: process.env.YANDEX_PASSWORD,
  },
});

const sendMail = async (name, email, message) => {
  const mailOptions = {
    from: process.env.YANDEX_EMAIL,
    to: 'azovtsevnikita@mail.ru',
    subject: 'Новое сообщение с сайта',
    text: `
      Имя: ${name}
      Email: ${email}
      Сообщение: ${message}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email успешно отправлен:', info.response);
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    throw error;
  }
};

module.exports = sendMail;