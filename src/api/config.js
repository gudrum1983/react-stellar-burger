import {BASE_URL, ENDPOINTS} from "../utils/config-api";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};




const checkSuccess = (res) => {
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


export const getIngredients = () => request(ENDPOINTS.ingredients);

export const getOrderDetailsRequest = (ingredientsOrder) => {
  return request(ENDPOINTS.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: ingredientsOrder,
    })
  })
};

export const getRegister = (name, pass, email) => {
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

export const getForgot = (email) => {
  return request(ENDPOINTS.passwordForgot, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
    })
  })
};

export const getReset = (password, token) => {
  return request(ENDPOINTS.passwordReset, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      token,
    })
  })
};


/*export const getLogin = (pass, email) => {
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
};*/

/*export const getUserDataRefresh = () => {
  return fetchWithRefresh(ENDPOINTS.authUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  })
};*/

/*export const getUserDataUpdateRefresh = (email, name, password) => {
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
};*/


/*export const getUserLogoutRefresh = () => {
  return fetchWithRefresh(ENDPOINTS.authLogout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      /!*     authorization: localStorage.getItem('accessToken')*!/
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};*/


/*export const getUser = () => {
  return request(ENDPOINTS.authUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  })
};*/


/*
export const refreshToken = () => {
  return request(ENDPOINTS.authToken, {
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
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    return await checkResponseWithRefresh(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
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
};*/
