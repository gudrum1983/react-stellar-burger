export const OPEN_ERROR_MODAL = 'OPEN_ERROR_MODAL';
export const CLOSE_ERROR_MODAL = 'CLOSE_ERROR_MODAL';


type TOpenErrorModal = {
  type: typeof OPEN_ERROR_MODAL,
  payload: string,
}

type TCloseErrorModal = {
  type: typeof CLOSE_ERROR_MODAL;
}


export type TErrorModalActions = TOpenErrorModal | TCloseErrorModal;

export function openErrorModal(text:string):TOpenErrorModal {
  return {type: OPEN_ERROR_MODAL, payload: text};
}

export function closeErrorModal():TCloseErrorModal {
  return {type: CLOSE_ERROR_MODAL};
}