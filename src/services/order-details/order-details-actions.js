import {clearBurgerConstructor} from "../burger-constructor/burger-constructor-actions";
import {getOrderDetailsInfo, getOrderDetailsReady} from "../../api/burger-order";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER_FAILED';

export function orderDetailsRequest() {
  return {type: GET_ORDER_REQUEST};
}

export function orderDetailsSuccess(order) {
  return {type: GET_ORDER_SUCCESS, payload: order};
}

export function orderDetailsFailed() {
  return {type: GET_ORDER_FAILED};
}

export function clearOrderDetails() {
  return {type: CLEAR_ORDER};
}

export function getReadyOrderDetails(ingredientsOrder) {
  return function (dispatch) {
    dispatch(orderDetailsRequest());
    getOrderDetailsReady(ingredientsOrder)
      .then(res => {
          dispatch(orderDetailsSuccess(res.order));
          dispatch(clearBurgerConstructor());
      })
      .catch(() => {
        dispatch(orderDetailsFailed());
      })
  };
}

export function getInfoOrderDetails(number) {
  return function (dispatch) {
    dispatch(orderDetailsRequest());
    getOrderDetailsInfo(number)
      .then(res => {
        console.log("infOrd", res)
        dispatch(orderDetailsSuccess(res.orders[0]));
      })
      .catch(() => {
        dispatch(orderDetailsFailed());
      })
  };
}
