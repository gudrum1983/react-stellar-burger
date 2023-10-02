import {CLOSE_MODAL, OPEN_MODAL} from "../actions/modal";

const initialState = {
  visible: false,
  type: "",
};


export function showModalReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        visible: false,
        type: "",
      }
        ;
    case OPEN_MODAL:
      return {
        visible: true,
        type: action.payload.type,
      };
    default: {
      return state;
    }
  }
}

/*
import {CLOSE_MODAL, OPEN_MODAL} from "../actions/modal";

const initialState = {
  visible: false,
  type: "",
  ingredient: {},
  orderNumber: "",
};


export function showModalReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        visible: false,
        type: "",
        ingredient: {},
        orderNumber: "",
      }
        ;
    case OPEN_MODAL:
      return {
        visible: true,
        type: action.payload.type,
        ingredient: action.payload.ingredient,
        orderNumber: action.payload.orderNumber ??= "",
      };
    default: {
      return state;
    }
  }
}*/
