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


const checkResponse = <T>(res: Response): Promise<T> | Promise<any> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};


//todo any clear
const checkSuccess = <T>(res: any | T): any | Promise<T> => {
  console.log({res})
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

//todo any clear
export const request = (endpoint: string, options?: any) => {
  return (fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess));
};


const checkResponse2 = async <T>(res: Response): Promise<T> => {
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

//todo any clear
export const request2 = <T>(endpoint: string, options?: any) => {
  return (fetch(`${BASE_URL}${endpoint}`, options)
      .then(checkResponse2<T>)
  )
};