const bcrypt = require('bcryptjs'); // модуль для хэша
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user'); // юзерсхема
const AuthError = require('../errors/AuthError');
const ConflictEmailError = require('../errors/ConflictEmailError');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');

const getUsersInfo = (req, res, next) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch((err) => next(err));

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным id не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError('некоректный запрос'));
      }
      if (err.message === 'NotFound') {
        next(new NotFoundError('id пользователя не найден'));
      }
    })
    .catch(next);
};
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError('Некорректные данные'));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictEmailError('Указанный пользователь уже зарегистрирован'));
      } else { next(err); }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => { res.status(200).send(user); })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError(
          'Переданы некорректные данные',
        );
      } else {
        next(err);
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => { res.status(200).send(user); })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError(
          'Переданы некорректные данные',
        );
      } else {
        next(err);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      // отправим токен, браузер сохранит его в куках
      res.cookie('jwt', token, {
      // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: 'Вход выполнен' });
    })
    .catch((err) => {
      next(new AuthError(`необходимо авторизоваться: ${err.message}`));
    });
};

module.exports = {
  getUsersInfo, getUserId, createUser, updateAvatar, updateUser, login, getUser,
};
