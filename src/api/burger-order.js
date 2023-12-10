import {ENDPOINTS} from "../utils/config-api";
import {request} from "../utils/config-api";

export const getOrderDetailsReady = (ingredientsOrder) => {
  return request(ENDPOINTS.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      ingredients: ingredientsOrder,
    })
  })
};

export const getOrderDetailsInfo = (number) => {
  return request(`${ENDPOINTS.orders}/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
};