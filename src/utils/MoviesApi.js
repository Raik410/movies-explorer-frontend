const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const handleResponse = (response) =>
    response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);

export const getMovies = () => {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(handleResponse);
}