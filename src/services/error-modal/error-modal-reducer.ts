import {CLOSE_ERROR_MODAL, OPEN_ERROR_MODAL, TErrorModalActions} from "./error-modal-action";

export type TErrorModalState = {
  openErrorModal: boolean,
  errorText: string,
};

const initialState:TErrorModalState = {
  openErrorModal: false,
  errorText: '',
};

//todo action:TErrorModalActions - проверить нужна ли эта запись
export const errorModalReducer = (state:TErrorModalState = initialState, action:TErrorModalActions):TErrorModalState => {
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
