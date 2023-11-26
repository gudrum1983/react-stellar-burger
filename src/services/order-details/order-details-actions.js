import {clearBurgerConstructor} from "../burger-constructor/burger-constructor-actions";
import {getInfoOrderDetailsRequest, getOrderDetailsRequest} from "../../api/burger-order";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER_FAILED';
export const GET_INFO_ORDER = 'GET_INFO_ORDER';

export function orderDetailsRequest() {
  return {type: GET_ORDER_REQUEST};
}

export function orderDetailsSuccess(orderNumber) {
  return {type: GET_ORDER_SUCCESS, payload: orderNumber};
}

export function orderDetailsFailed() {
  return {type: GET_ORDER_FAILED};
}

export function orderInfoDetailsSuccess(order) {
  return {type: GET_INFO_ORDER, payload: order};
}

export function clearOrderDetails() {
  return {type: CLEAR_ORDER};
}

export function getOrderDetails(ingredientsOrder) {
  return function (dispatch) {
    dispatch(orderDetailsRequest());
    getOrderDetailsRequest(ingredientsOrder)
      .then(res => {
          dispatch(orderDetailsSuccess(res.order.number));
          dispatch(clearBurgerConstructor());
      })
      .catch(() => {
        dispatch(orderDetailsFailed());
      })
  };
}

export function getInfoOrder(number) {
  return function (dispatch) {
    dispatch(orderDetailsRequest());
    getInfoOrderDetailsRequest(number)
      .then(res => {
        dispatch(orderInfoDetailsSuccess(res));
      })
      .catch(() => {
        dispatch(orderDetailsFailed());
      })
  };
}
