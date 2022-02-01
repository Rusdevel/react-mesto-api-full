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
    }).then(console.log());
  }

  //Получил с сервера карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkRes);
  }

  //отправляем измененные данные пользовотеля на сервер
  editeUserDate(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
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
        avatar: link.link,
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
  }
  //изменяем статус лайка
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.setLike(id);
    } else {
      return this.removeLike(id);
    }
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