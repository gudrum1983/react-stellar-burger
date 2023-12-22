import {ENDPOINTS, request} from "../utils/config-api";
import {MessageOrder} from "./user";
import {TIngredient, TOrder, TStatusOrder} from "../utils/types";

type ReadyOrder = {
    success: boolean;
    name: string;
    order: {
      ingredients: Array<TIngredient>;
      _id: string;
      owner: {
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
      },
      status: TStatusOrder;
      name: string;
      createdAt: string;
      updatedAt: string;
      number: number;
      price: number;
    }
  }


export const getOrderDetailsReady = (ingredientsOrder: Pick<TOrder, "ingredients">): Promise<ReadyOrder> => {
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