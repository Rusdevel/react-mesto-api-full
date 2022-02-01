class Api {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.url;
  }
  // Получаем информацию о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkRes);
  }

  //Получил с сервера карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkRes);
  }

  //отправляем измененные данные пользовотеля на сервер
  editeUserDate(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about:about,
      }),
    }).then(this._checkRes);
  }
  //обновление аватарки
  updateAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    }).then(this._checkRes);
  }
  //отправляем карточки
  getNewCards(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkRes);
  }



  
  //удаление карточки
  cardDelete(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkRes);
  }
/*
  //настройка лайка
  setLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkRes);
  }

  //убрать лайк
  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkRes);
  }*/
  //изменяем статус лайка
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((result) => this._checkRes(result));
  }



  // проверяем приняли ли запрос
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // другие методы работы с API
}
const api = new Api({
  url: `https://api.mesto-application.nomoredomains.work`,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;