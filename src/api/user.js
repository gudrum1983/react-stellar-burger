import {ENDPOINTS} from "../utils/config-api";
import {fetchWithRefresh} from "./refresh-token";
import {request} from "../utils/config-api";

const getUser = () => {
  return fetchWithRefresh(ENDPOINTS.authUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  })
};

const updateUser = (email, name, password) => {
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

const logout = () => {
  return fetchWithRefresh(ENDPOINTS.authLogout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};

const login = (pass, email) => {
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

export const register = (name, pass, email) => {
  return request(ENDPOINTS.authRegister, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": email,
      "password": pass,
      "name": name
    })
  })
};

export const authApi = {
  login,
  logout,
  updateUser,
  getUser,
  register
};