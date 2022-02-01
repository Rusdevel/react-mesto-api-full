export const BASE_URL = 'api.mesto-application.nomoredomains.work';

const checkRes = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
    return fetch('api.mesto-application.nomoredomains.work/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    }).then((res) => console.log(res) // checkRes(res)
    )
}

export const authorization = (email, password, token) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: console.log(token)
        },
        body: JSON.stringify({email, password})
    }).then((res) => console.log(res))
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
        },

    }).then((res) => console.log(res))
}