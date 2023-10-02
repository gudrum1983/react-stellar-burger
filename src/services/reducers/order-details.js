import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS,} from "../actions/order-details";

const initialState = {
  orderDetails: null,
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
      return { ...state, orderFailed: false, orderDetails: action.order, orderRequest: false };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    default: {
      return state;
    }
  }
};

// Наш первый thunk
