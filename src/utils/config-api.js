export const BASE_URL = "https://norma.nomoreparties.space/api/";

export const ENDPOINTS = {
  ingredients: "ingredients",
  orders: "orders",
  authRegister: "auth/register",
  authLogin: "auth/login",
  authLogout: "auth/logout",
  authToken: "auth/token",
  authUser: "auth/user",
  passwordForgot: "password-reset",
  passwordReset: "password-reset/reset",
}
const checkResponse = (res) => {
/*  console.log("checkResponse", res)*/
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
/*  console.log("checkSuccess", res)*/
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint, options) => {
  return (fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess));
};