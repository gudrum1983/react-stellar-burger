import {BASE_URL, ENDPOINTS} from "../utils/config-api";

const url = (endpoint) => `${BASE_URL}${endpoint}`;

const endpointsRefresh = ENDPOINTS.authToken;

const checkResponseWithRefresh = (res) => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
};

const authToken = () => {
  return fetch(url(endpointsRefresh), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponseWithRefresh);
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(url(endpoint), options);
    return await checkResponseWithRefresh(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await authToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${BASE_URL}${endpoint}`, options); //повторяем запрос
      return await checkResponseWithRefresh(res);
    } else {
      return Promise.reject(err);
    }
  }
};