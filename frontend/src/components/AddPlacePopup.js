import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  //очистил инпуты перед открытие попапа
  React.useEffect(
    () => {
      setLink("");
      setName("");
    },
    //открыл попап
    [props.isOpen]
  );

  //меняем название карточки
  function changeName(e) {
    setName(e.target.value);
  }

  //меняем ссылку
  function changeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="edite-card"
      title="Новое место"
      buttonText="Сохранить"
    >
      <input
        type="text"
        name="name"
        value={name || ""}
        onChange={changeName}
        id="nameCard"
        className="
                  popup__input
                  popup__input_type_name
                  popup__input_type_edite-card-name
                "
        minLength="2"
        maxLength="30"
        placeholder="Название"
        required
      />
      <span className="popup__input-error popup__input-error-name" name="errorName" id="nameCard-error"></span>
      <input
        type="url"
        name="link"
        value={link || ""}
        onChange={changeLink}
        id="descriptionCard"
        className="
                  popup__input
                  popup__input_type_job
                  popup__input_type_edite-card-link
                "
        placeholder="Ссылка на картинку"
        required
      />
      <span
        className="popup__input-error popup__input-error-description"
        name="errorDescription"
        id="descriptionCard-error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
