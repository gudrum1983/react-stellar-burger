export const USER_NAME = 'USER_NAME';
export const PASSWORD = 'PASSWORD';
export const NEW_PASSWORD = 'NEW_PASSWORD';
export const EMAIL = 'EMAIL';

export function addUser(value) {
  return {type: USER_NAME, payload: value}
}

export function addPassword(value) {
  return {type: PASSWORD, payload: value}
}

export function addEmail(value) {
  return {type: EMAIL, payload: value}
}

export function addNewPassword(value) {
  return {type: NEW_PASSWORD, payload: value}
}