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

export const registartion = (name, email, password, setRequestState) => {
    return fetch(
        `${NORMA_API}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            if (data) {
                setRequestState('ok');
            }
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        })
        ;
};

export const login = (email, password, setRequestState) => {
    return fetch(
        `${NORMA_API}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            if (data) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setRequestState('ok');
            }
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        })
        ;
};

export const logout = (setLogoutState) => {
    return fetch(
        `${NORMA_API}/auth/logout`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": localStorage.getItem('refreshToken')
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            if (data) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setLogoutState('ok');
            }
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        })
        ;
};

export const recoverPassword = (email, setRequestState) => {
    return fetch(
        `${NORMA_API}/password-reset`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email
            })
        })
        .then((response) => {
            if (response.ok) {
                setRequestState('ok');
                return response.json();
            }
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        })
        ;
};

export const resetPassword = (password, token, setRequestState) => {
    return fetch(
        `${NORMA_API}/password-reset/reset`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": password,
                "token": token,
            })
        })
        .then((response) => {
            if (response.ok) {
                setRequestState('ok');
                return response.json();
            }
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        })
        ;
};

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
    return fetch(
        `${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "token": localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse);
};

export async function fetchWithRefresh(url, options, setResponse) {
    try {
        const res = await fetch(`${NORMA_API}${url}`, options);
        return await checkResponse(res).then((data) => {
            if (data) {
                setResponse(data);
            }
        });
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(`${NORMA_API}${url}`, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};