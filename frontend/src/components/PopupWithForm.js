import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_open" : ""}`}>
      <div className="popup__content">
        <button onClick={props.onClose} className="popup__close" type="button"></button>
        <h2 className="popup__title">{props.title}</h2>
        <form name={props.name} className="popup__form popup__form_add-form" onSubmit={props.onSubmit}>
          {props.children}
          <button className="button popup__button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
