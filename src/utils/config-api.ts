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

type Success = {success?: boolean}



const checkResponse = <T>(res:Response):Promise<T> | Promise<any> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};


//todo any clear
const checkSuccess = <T>(res:any | T): any| Promise<T> => {
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


const checkResponse2 = <T>(res:Response):Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};


const checkSuccess2 = <T extends Success>(res:T):T | Promise<T> => {
  console.log({res})
  if (res && typeof res === 'object' && "success" in res) {
    console.log("success", res.success)
    if (res.success) {
      return res;
    }
  }
  return Promise.reject(new Error(`Ответ не success: ${res}`)) as Promise<T>;
};

//todo any clear
export const request2 = <T extends Success>(endpoint: string, options?: any) => {
  return (fetch(`${BASE_URL}${endpoint}`, options)
    .then(res => checkResponse2<T>(res))
    .then(res => checkSuccess2<T>(res))
  )
};