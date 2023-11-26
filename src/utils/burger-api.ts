import { checkResponse } from "./commonFunctions";
export const NORMA_API = "https://norma.nomoreparties.space/api";

interface IOptions {
  method: string;
  headers: { "Content-Type": string };
  body: string;
}

function request(url: string, options: IOptions) {
  return fetch(url, options).then(checkResponse);
}

const refreshToken = () => {
  return request(`${NORMA_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export async function fetchWithRefresh(
  url: string,
  options: any,
  setResponse: (data: any) => void,
  hidePreloader: () => void
) {
  try {
    const res = await fetch(`${NORMA_API}${url}`, options);
    return await checkResponse(res)
      .then((data: any) => {
        if (data) {
          setResponse(data);
        }
      })
      .finally(hidePreloader);
  } catch (err: any) {
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
}
