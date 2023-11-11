import {ENDPOINTS} from "../utils/config-api";
import {request} from "../utils/config-api";

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