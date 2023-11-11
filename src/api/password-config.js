import {request} from "../utils/config-api";
import {ENDPOINTS} from "../utils/config-api";

export const getForgot = (email) => {
  return request(ENDPOINTS.passwordForgot, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
    })
  })
};

export const getReset = (password, token) => {
  return request(ENDPOINTS.passwordReset, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      token,
    })
  })
};