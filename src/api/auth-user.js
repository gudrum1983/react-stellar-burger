// В проектной работе эта функция будет обращаться к серверу
// и обновлять токены если они уже устарели.
import {BASE_URL, ENDPOINTS} from "../utils/config-api";
import {fetchWithRefresh} from "./refresh-token";
import {request} from "./config";


/*const getUser = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: {},
      });
    }, 1000);
  });*/
export const getUserDataWithRefresh = () => {
  return fetchWithRefresh(ENDPOINTS.authUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  })
};

export const getUserDataUpdateWithRefresh = (email, name, password) => {
  return fetchWithRefresh(ENDPOINTS.authUser, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  })
};

const login = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        accessToken: "test-token",
        refreshToken: "test-refresh-token",
        user: {},
      });
    }, 1000);
  });



const logout = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

export const getUserLogoutRefresh = () => {
  return fetchWithRefresh(ENDPOINTS.authLogout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      /*     authorization: localStorage.getItem('accessToken')*/
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};

export const getLogin = (pass, email) => {
  return request(ENDPOINTS.authLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "password": pass,
    })
  })
};






export const api = {
/*  getUser,*/
  login,
  logout
};