import {
  CLEAR_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_INFO_ORDER
} from "./order-details-actions";

const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  infoOrder: null,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return {...state, orderFailed: false, orderNumber: action.payload, orderRequest: false};
    }
    case GET_ORDER_FAILED: {
      return {...state, orderFailed: true, orderNumber: false};
    }
    case GET_INFO_ORDER: {
      return {...state, infoOrder: action.payload};
    }
    case CLEAR_ORDER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

