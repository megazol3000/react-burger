const NORMA_API = 'https://norma.nomoreparties.space/api';

const getIngredients = () => {
    return fetch(`${NORMA_API}/ingredients`)
    .then((response) => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)));
};

export default getIngredients;