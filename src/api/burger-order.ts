import {ENDPOINTS, request} from "../utils/config-api";
import {MessageOrder} from "./user";
import {TOrderIngredients, TReadyOrder} from "../utils/types";

type ReadyOrder = {
    success: boolean;
    name: string;
    order: TReadyOrder
  }


export const getOrderDetailsReady = (ingredientsOrder: TOrderIngredients): Promise<ReadyOrder> => {
  return request<ReadyOrder>(ENDPOINTS.orders, {
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

//todo number dont string - Pick<TOrder, "number">
export const getOrderDetailsInfo = (number: string): Promise<MessageOrder> => {
  return request(`${ENDPOINTS.orders}/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
};