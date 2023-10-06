import {request} from "./index";

const baseUrl = "https://norma.nomoreparties.space/api/"

const endpoints = {
  ingredients: "ingredients",
  orders: "orders",
}

export const getOrderDetailsRequest = (ingredientsOrder) => {
  return request(baseUrl, endpoints.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: ingredientsOrder,
    })
  })
};

export const getBurgerIngredientsData = () => {
  return request(baseUrl, endpoints.ingredients)
};