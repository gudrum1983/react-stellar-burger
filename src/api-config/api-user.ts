import {ENDPOINTS, request} from "../utils/config-api";
import {fetchWithRefresh} from "./api-refresh-token";
import {TIngredient, TOrder} from "../utils/types";

export type ArgumentsUser = {
  email?: string;
  name?: string;
  password?: string;
  token?: string;
}

export type DataUser = {
  email: string;
  name: string;
}

type MessageLogin = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: DataUser
}

type MessageUpdUser = {
  success: boolean;
  user: DataUser
}

type MessageGetUser = {
  success: boolean;
  user: DataUser
}

type MessageLogout = {
  success: boolean,
  message: "Successful logout" | string
}

export type MessageOrder = {
  success: boolean;
  orders: Array<TOrder>;
}


export type MessageIngredients = {
  success: boolean;
  data: Array<TIngredient>
}


/**
 * Функция запрос к АПИ для получения данных о пользователе
 */
const getUser = (): Promise<MessageGetUser> => {
    return fetchWithRefresh(ENDPOINTS.authUser, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': String(localStorage.getItem('accessToken')),
        }
      }
    )
  }
;

/**
 * Функция запрос к АПИ для обновления данных пользователя
 *  @param values - значения инпутов.
 *  @param values.name - значения инпута имени.
 *  @param values.password - значения инпута пароля.
 *  @param values.email - значения инпута почты.
 */
const updateUser = ({email, name, password}: ArgumentsUser): Promise<MessageUpdUser> => {
  return fetchWithRefresh(ENDPOINTS.authUser, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': String(localStorage.getItem('accessToken')),

    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  })
};

/**
 * Функция запрос к АПИ для выхода пользователя из приложения
 */
const logout = (): Promise<MessageLogout> => {
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

/**
 * Функция запрос к АПИ для идентификации и аутентификации пользователя
 *  @param values - значения инпутов.
 *  @param values.password - значения инпута пароля.
 *  @param values.email - значения инпута почты.
 */
const login = ({password, email}: ArgumentsUser): Promise<MessageLogin> => {
  return request(ENDPOINTS.authLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })
};

/**
 * Функция запрос к АПИ для регистрации нового пользователя
 *  @param values - значения инпутов.
 *  @param values.name - значения инпута имени.
 *  @param values.password - значения инпута пароля.
 *  @param values.email - значения инпута почты.
 */
export const register = ({name, password, email}: ArgumentsUser): Promise<MessageLogin> => {
  return request(ENDPOINTS.authRegister, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    })
  })
};

export const configUserApi = {
  login,
  logout,
  updateUser,
  getUser,
  register
};

