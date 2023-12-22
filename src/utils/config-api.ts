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

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    const resJson = await res.json()
    if (resJson && typeof resJson === 'object' && "success" in resJson) {
      console.log({resJson});
      if (resJson.success) {
        return resJson;
      }
    }
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const request = <T>(endpoint: string, options?: RequestInit) => {
  return (fetch(`${BASE_URL}${endpoint}`, options)
      .then(checkResponse<T>)
  )
};