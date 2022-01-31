const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // убеждаемся, что он есть
  if (!req.cookies.jwt) {
    next(new AuthError('проверка'));
  }
  // извлечём токен и выкинем
  const token = req.cookies.jwt;
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new AuthError('Проверка'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
