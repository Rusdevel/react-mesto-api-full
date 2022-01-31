import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef(""); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  //очистил инпуты перед открытие попапа
  React.useEffect(
    () => {
      //сбросил инпуты
      avatarRef.current.value = "";
    },
    //открыл попап
    [props.isOpen]
  );

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="update-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <input
        type="url"
        name="link"
        id="descriptionAvatar"
        className="
                  popup__input
                  popup__input_type_job
                  popup__input_type_edite-card-link
                "
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span
        className="popup__input-error popup__input-error-description"
        name="errorDescription"
        id="descriptionAvatar-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
