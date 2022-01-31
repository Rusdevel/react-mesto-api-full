const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const path = require('path');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
// const cors = require('./middlewares/cors');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([/\w \\.-]*)*\/?$/),
  }),
}), createUser);
// авторизация
app.use(auth);
app.use('/', usersRoute);
app.use('/', cardsRoute);

app.use(errorLogger); // подключаем логгер ошибок

app.all('*', (req, res, next) => {
  next(new NotFoundError('ресурс не найден.'));
});

app.use(errors());

// мидлвэр обработчика ошибки
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
