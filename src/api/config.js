import {request} from "./index";

const baseUrl = "https://norma.nomoreparties.space/api/"

const endpoints = {
  ingredients: "ingredients",
  orders: "orders",
}


export const getOrderData = (ingredientsOrder) => {
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

export const getIngredientsData = () => {
  return request(baseUrl, endpoints.ingredients)
};