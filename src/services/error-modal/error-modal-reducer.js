import {CLOSE_ERROR_MODAL, OPEN_ERROR_MODAL} from "./error-modal-action";

const initialState = {
  openErrorModal: false,
  errorText: '',
};

export const errorModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ERROR_MODAL: {
      return {...state, openErrorModal: true, errorText: action.payload};
    }
    case CLOSE_ERROR_MODAL: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
