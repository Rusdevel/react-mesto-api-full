class Api {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.url;
  }
  // Получаем информацию о пользователе
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
      Authorization: `Bearer ${token}`
    }).then(this._checkRes);
  }

  //Получил с сервера карточки
  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
      Authorization: `Bearer ${token}`
    }).then(this._checkRes);
  }

  //отправляем измененные данные пользовотеля на сервер
  editeUserDate(data,token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
      Authorization: `Bearer ${token}`,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkRes);
  }
  //обновление аватарки
  updateAvatar(link,token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
      Authorization: `Bearer ${token}`,
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    }).then(this._checkRes);
  }
  //отправляем карточки
  getNewCards(data,token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
      Authorization: `Bearer ${token}`,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkRes);
  }

  //удаление карточки
  cardDelete(cardId,token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
      Authorization: `Bearer ${token}`,
    }).then(this._checkRes);
  }
  //настройка лайка
  setLike(cardId,token) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
      Authorization: `Bearer ${token}`
    }).then(this._checkRes);
  }

  //убрать лайк
  removeLike(cardId,token) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
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
   // authorization: "f77a7956-a5a9-4ad6-a04a-920b557c7dfd",
   "Accept": "application/json",
    "Content-Type": "application/json"
  },
});
export default api;
