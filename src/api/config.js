export const BASE_URL = "https://norma.nomoreparties.space/api/";

const endpoints = {
  ingredients: "ingredients",
  orders: "orders",
  authRegister:"auth/register",
  authLogin:"auth/login",
  authLogout:"auth/logout",
  authToken:"auth/token",
  authUser:"auth/user",
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
/*  console.log('configCheckResponse', res)*/
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint, options) => {
  return (fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess));
};

export const getIngredients = () => request(endpoints.ingredients);

export const getOrderDetailsRequest = (ingredientsOrder) => {
  return request(endpoints.orders, {
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
  return request(endpoints.authRegister, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": email,
      "password": pass,
      "name": name
    } )
  })
};


export const getLogin = (pass, email) => {
  return request(endpoints.authLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "password": pass,
    } )
  })
};

export const getUserDataRefresh = () => {
  return fetchWithRefresh(endpoints.authUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  })
};

export const getUserDataUpdateRefresh = (email, name, password) => {
  return fetchWithRefresh(endpoints.authUser, {
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


export const getUserLogoutRefresh = () => {
  return fetchWithRefresh(endpoints.authLogout, {
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



export const getUser = () => {
  return request(endpoints.authUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  })
};


export const refreshToken = () => {
  return request(endpoints.authToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
/*      authorization: localStorage.getItem('accessToken')*/
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh1 = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const checkReponse1 = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
/*    console.log('fetchWithRefreshRes',res)*/
    return await checkReponse1(res);
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
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};