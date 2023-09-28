import { checkResponse } from "./commonFunctions";
const NORMA_API = 'https://norma.nomoreparties.space/api';

function request(url, options) {
    return fetch(url, options).then(checkResponse);
}

export const getIngredients = () => {
    return request(`${NORMA_API}/ingredients`);
};

export const getOrder = (burgerBun, ingredients, setOrderDetails, setModalVisible, hidePreloader, removeIngredients) => {
    return request(
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
        .then((data) => {
            setOrderDetails(data);
            setModalVisible(true);
        })
        .then(removeIngredients)
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        }).finally(hidePreloader);
    ;
};

export const registartion = (name, email, password, setRequestState, hidePreloader) => {
    return request(
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
        .then((data) => {
            if (data) {
                setRequestState('ok');
            }
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        }).finally(hidePreloader);
};

export const login = (email, password, setRequestState, hidePreloader) => {
    return request(
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
        .then((data) => {
            if (data) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setRequestState('ok');
            }
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        }).finally(hidePreloader);
};

export const logout = (setLogoutState, hidePreloader) => {
    return request(
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
        .then((data) => {
            if (data) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setLogoutState('ok');
            }
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        }).finally(hidePreloader);
};

export const recoverPassword = (email, setRequestState, hidePreloader) => {
    return request(
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
        .then(() => setRequestState('ok'))
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        }).finally(hidePreloader);
};

export const resetPassword = (password, token, setRequestState, hidePreloader) => {
    return request(
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
        .then(() => setRequestState('ok'))
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
        }).finally(hidePreloader);
};

export const refreshToken = () => {
    return request(
        `${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "token": localStorage.getItem('refreshToken'),
        }),
    });
};

export async function fetchWithRefresh(url, options, setResponse, hidePreloader) {
    try {
        const res = await fetch(`${NORMA_API}${url}`, options);
        return await checkResponse(res).then((data) => {
            if (data) {
                setResponse(data);
            }
        }).finally(hidePreloader);
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
            hidePreloader();
            return await checkResponse(res);
        } else {
            hidePreloader();
            return Promise.reject(err);
        }
    }
};