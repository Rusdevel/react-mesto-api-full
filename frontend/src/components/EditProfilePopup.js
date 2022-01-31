import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  //меняем имя профиля
  function changeName(e) {
    setName(e.target.value);
  }

  //меняем вид деятельности
  function changeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="nameProfile"
        name="name"
        value={name || ""}
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        required
        onChange={changeName}
      />
      <span className="popup__input-error popup__input-error-name" name="errorName" id="nameProfile-error"></span>
      <input
        type="text"
        name="description"
        value={description || ""}
        id="descriptionProfile"
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_type_job"
        placeholder="О себе"
        required
        onChange={changeDescription}
      />
      <span
        className="popup__input-error popup__input-error-description"
        id="descriptionProfile-error"
        name="errorDescription"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
