import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const сurrentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="section profile">
        <div className="profile__avatar-block">
          <img className="profile__avatar" src={сurrentUser.avatar} alt="Аватар" />
          <div onClick={props.onEditAvatar} className="profile__avatar-button"></div>
        </div>

        <div className="profile__section">
          <div className="profile__date">
            <h1 className="profile__name">{сurrentUser}</h1>
            <button onClick={props.onEditProfile} type="button" className="button profile__button"></button>
            <p className="profile__job">{сurrentUser.about}</p>
          </div>
          <button onClick={props.onAddPlace} type="button" className="button profile__edit-button"></button>
        </div>
      </section>

      <section className="places-list section">
        {props.cards.map((card) => (
          <Card
            onCardClick={props.onCardClick}
            key={card._id}
            card={card}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
