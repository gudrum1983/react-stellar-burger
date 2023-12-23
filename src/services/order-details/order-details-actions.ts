import {clearBurgerConstructor} from "../burger-constructor/burger-constructor-actions";
import {getOrderDetailsInfo, getOrderDetailsReady} from "../../api/burger-order";
import {TOrder, TOrderIngredients, TReadyOrder} from "../../utils/types";
import {AppThunk} from "../store";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER_FAILED';

type TOrderDetailsRequest = {
  type: typeof GET_ORDER_REQUEST,
}

type TOrderDetailsSuccess = {
  type: typeof GET_ORDER_SUCCESS,
  payload: TOrder | TReadyOrder,
}

type TOrderDetailsFailed = {
  type: typeof GET_ORDER_FAILED,
}

type TClearOrderDetails = {
 type: typeof CLEAR_ORDER,
}

export type TOrderDetailsActions = TOrderDetailsRequest | TOrderDetailsSuccess | TOrderDetailsFailed | TClearOrderDetails;

export function orderDetailsRequest():TOrderDetailsRequest {
  return {type: GET_ORDER_REQUEST};
}

export function orderDetailsSuccess(order: TOrder | TReadyOrder):TOrderDetailsSuccess {
  return {type: GET_ORDER_SUCCESS, payload: order};
}

export function orderDetailsFailed():TOrderDetailsFailed {
  return {type: GET_ORDER_FAILED};
}

export function clearOrderDetails():TClearOrderDetails {
  return {type: CLEAR_ORDER};
}

export function getReadyOrderDetails(ingredientsOrder:TOrderIngredients):AppThunk {
  return function (dispatch) {
    dispatch(orderDetailsRequest());
    getOrderDetailsReady(ingredientsOrder)
      .then(res => {
          dispatch(orderDetailsSuccess(res.order));
          //todo ignor
        //@ts-ignore
          dispatch(clearBurgerConstructor());
      })
      .catch(() => {
        dispatch(orderDetailsFailed());
      })
  };
}

export function getInfoOrderDetails(number:string):AppThunk {
  return function (dispatch) {
    dispatch(orderDetailsRequest());
    getOrderDetailsInfo(number)
      .then(res => {
        console.log("infOrd", res)
        //todo определиться с res orders или  data????
        dispatch(orderDetailsSuccess(res.orders[0]));
      })
      .catch(() => {
        dispatch(orderDetailsFailed());
      })
  };
}
