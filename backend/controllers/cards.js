const Card = require('../models/card');
const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
// показать все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError(
          'Переданы некорректные данные в методы создания карточки',
        );
      } else {
        next(err);
      }
    })
    .catch(next);
};

// удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => next(new NotFoundError('Карточка с указанным id не найдена')))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Нет прав для удаления карточки'));
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((cardId) => {
          if (!cardId) {
            throw new NotFoundError('Карточка не найдена');
          }
          return res.status(200).send({ message: 'Карточка удалена' });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new RequestError(
              'Переданы некорректные данные',
            );
          } else {
            next(err);
          }
        })
        .catch(next);
    })
    .catch(next);
};

// обновление лайков
const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError('Переданны некоректные данные'));
      }
      if (err.message === 'NotFound') {
        next(new NotFoundError('карточка с указанным id не найдена'));
      } else {
        next(err);
      }
    });
};
//  удаление лайка
const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError('Переданны некоректные данные'));
      }
      if (err.message === 'NotFound') {
        next(new NotFoundError('карточка с указанным id не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
