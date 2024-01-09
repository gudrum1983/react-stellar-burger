import {ENDPOINTS, request} from "../utils/config-api";
import {MessageOrder} from "./api-user";
import {TOrderIngredients, TReadyOrder} from "../utils/types";
import {fetchWithRefresh} from "./api-refresh-token";

type ReadyOrder = {
    success: boolean;
    name: string;
    order: TReadyOrder
  }

export const getOrderDetailsReady = (ingredientsOrder: TOrderIngredients): Promise<ReadyOrder> => {
  return fetchWithRefresh<ReadyOrder>(ENDPOINTS.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': String(localStorage.getItem('accessToken'))
    },
    body: JSON.stringify({
      ingredients: ingredientsOrder,
    })
  })
};

export const getOrderDetailsInfo = (number: string): Promise<MessageOrder> => {
  return request(`${ENDPOINTS.orders}/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
};