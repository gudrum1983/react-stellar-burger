import {getOrderDetailsRequest} from "../../api/config";
import {OPEN_MODAL} from "./modal";
import {RESET_ORDER} from "./burger-constructor";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrderDetails(ingredientsOrder) {

  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderDetailsRequest(ingredientsOrder)
      .then(res => {
        if (res && res.success) {
          // В случае успешного получения данных вызываем экшен
          // для записи полученных данных в хранилище
          dispatch({type: GET_ORDER_SUCCESS, order: res.order.number});
          dispatch({type: OPEN_MODAL, payload: {type: "order"}});
          dispatch({type: RESET_ORDER});
        } else {
          // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({type: OPEN_MODAL, payload: {type: "error"}});
          dispatch({type: GET_ORDER_FAILED});
        }
      })
      .catch(() => {
        dispatch({type: OPEN_MODAL, payload: {type: "error"}});
        dispatch({type: GET_ORDER_FAILED});
      })
  };
}