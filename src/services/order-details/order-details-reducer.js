import {
  CLEAR_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "./order-details-actions";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
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
      return {...state, orderFailed: false, order: action.payload, orderRequest: false};
    }
    case GET_ORDER_FAILED: {
      return {...state, orderFailed: true, order: null};
    }
    case CLEAR_ORDER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

