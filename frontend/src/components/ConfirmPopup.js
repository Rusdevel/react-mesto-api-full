import React from "react";

function ConfirmPopup() {
  return (
    <div className="popup popup_type_delete-card">
      <div className="popup__content">
        <button className="popup__close" type="button"></button>
        <h2 className="popup__title">Вы уверены?</h2>
        <button className="button popup__button" type="submit">
          Да
        </button>
      </div>
    </div>
  );
}

export default ConfirmPopup;
