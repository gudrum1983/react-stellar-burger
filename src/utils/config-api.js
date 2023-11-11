// В проектной работе эта функция будет обращаться к серверу
// и обновлять токены если они уже устарели.
import {getLogin, getRegister} from "../api/config";

const getUser = () =>

  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: {},
      });
    }, 1000);
  });

export const registerApi = (name, pass, email) => getRegister(name, pass, email);

const logout = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });  

export const configApi = {
  getUser,
  logout,
};



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