export const BASE_URL = "https://norma.nomoreparties.space/api/";

const endpoints = {
  ingredients: "ingredients",
  orders: "orders",
  authRegister:"auth/register",
}

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

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const getIngredients = () => request(endpoints.ingredients);

export const getOrderDetailsRequest = (ingredientsOrder) => {
  return request(endpoints.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "password": pass,
      "name": name
    } )
  })
};