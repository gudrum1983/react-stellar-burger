export const OPEN_ERROR_MODAL = 'OPEN_ERROR_MODAL';
export const CLOSE_ERROR_MODAL = 'CLOSE_ERROR_MODAL';

export function openErrorModal(text) {
  return {type: OPEN_ERROR_MODAL, payload: text};
}

export function closeErrorModal() {
  return {type: CLOSE_ERROR_MODAL};
}