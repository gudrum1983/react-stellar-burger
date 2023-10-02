import {getOrderDetailsRequest} from "../../api/config";
import {OPEN_MODAL} from "./modal";


/*export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';*/
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrderDetails(ingredientsOrder) {

  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    const test = getOrderDetailsRequest(ingredientsOrder)

      test.then(data => {
        console.log(data)
        dispatch({type: GET_ORDER_SUCCESS, order: data.order.number});
        dispatch({type: OPEN_MODAL, payload: {type: "order"}});
      })
      .catch(() => {
        dispatch({type: OPEN_MODAL, payload: {type: "error"}});
      })
  };
}

/*export function orderDetailsReducer3() {
  // Воспользуемся первым аргументом из усилителя redux-thunk — dispatch
  return function(dispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоадер или заблокировать
    // ввод на время выполнения запроса
    dispatch({
      type: GET_FEED
    })
    // Запрашиваем данные у сервера
    fetch('/feed').then( res  => {
      if (res && res.success) {
        // В случае успешного получения данных вызываем экшен
        // для записи полученных данных в хранилище
        dispatch({
          type: GET_FEED_SUCCESS,
          feed: res.data
        })
      } else {
        // Если произошла ошибка, отправляем соответствующий экшен
        dispatch({
          type: GET_FEED_FAILED
        })
      }
    }).catch( err => {
      // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch({
        type: GET_FEED_FAILED
      })
    })
  }
}*/


/*    export function applyPromo(code) {
      return function(dispatch) {
        dispatch({
          type: APPLY_PROMO_REQUEST
        });
        applyPromoCodeRequest(code).then(res => {
          if (res && res.success) {
            dispatch({
              type: APPLY_PROMO_SUCCESS,
              value: { ...res, code }
            });
          } else {
            dispatch({
              type: APPLY_PROMO_FAILED
            });
          }
        });
      };
    }*/




/*    getOrderDetailsRequest(ingredientsOrder).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.data
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    });*/