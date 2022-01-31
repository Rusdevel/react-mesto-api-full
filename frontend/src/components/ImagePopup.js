import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card ? "popup_open" : ""}`}>
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__close" type="button"></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <h2 className="popup__image-title">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
