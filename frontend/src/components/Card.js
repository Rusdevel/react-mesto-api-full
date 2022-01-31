import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const сurrentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === сurrentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `place-card__trash ${isOwn ? "place-card__trash_active" : "place-card__trash"}`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === сurrentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `place-card__like-img ${isLiked ? "place-card__like-img_active" : ""}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div className="place-card">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
      <img src={props.card.link} alt={props.card.name} onClick={handleClick} className="place-card__image" />
      <div className="place-card__description">
        <h2 className="place-card__title">{props.card.name}</h2>
        <div className="place-card__like-section">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <span className="place-card__like-info">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
