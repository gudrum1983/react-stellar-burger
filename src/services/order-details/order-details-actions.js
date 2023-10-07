import {getOrderDetailsRequest} from "../../api/config";
import {clearBurgerConstructor} from "../burger-constructor/burger-constructor-actions";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER_FAILED';

export function orderDetailsRequest() {
  return {type: GET_ORDER_REQUEST};
}

export function orderDetailsSuccess(orderNumber) {
  return {type: GET_ORDER_SUCCESS, payload: orderNumber};
}

export function orderDetailsFailed() {
  return {type: GET_ORDER_FAILED};
}

export function clearOrderDetails() {
  return {type: CLEAR_ORDER};
}

export function getOrderDetails(ingredientsOrder) {

  return function (dispatch) {
    dispatch(orderDetailsRequest());
    getOrderDetailsRequest(ingredientsOrder)
      .then(res => {
        if (res && res.success) {
          // В случае успешного получения данных вызываем экшен
          // для записи полученных данных в хранилище
          dispatch(orderDetailsSuccess(res.order.number));
          dispatch(clearBurgerConstructor());
        } else {
          // Если произошла ошибка, отправляем соответствующий экшен
          dispatch(orderDetailsFailed());
        }
      })
      .catch(() => {
        dispatch(orderDetailsFailed());
      })
  };
}