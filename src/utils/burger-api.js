const NORMA_API = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
    return fetch(`${NORMA_API}/ingredients`)
        .then((response) => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)));
};

export const getOrder = (burgerBun, ingredients, setOrderDetails, setModalVisible) => {
    return fetch(
        `${NORMA_API}/orders`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "ingredients": [
                    burgerBun,
                    ...ingredients,
                    burgerBun
                ]
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка при попытке сделать заказ ${response.status}`);
        })
        .then((data) => {
            setOrderDetails(data);
            setModalVisible(true);
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        })
        ;
};