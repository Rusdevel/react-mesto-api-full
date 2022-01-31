const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const {
  getUsersInfo, getUserId, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/users', getUsersInfo);
router.get('/users/me', getUser);

// возвращает пользователя по id
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserId);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

// обновляет аватар
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required()
        .regex(/^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([/\w \\.-]*)*\/?$/),
    }),
  }),
  updateAvatar,
);

module.exports = router;
