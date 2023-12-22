import {ENDPOINTS, request} from "../utils/config-api";
import {ArgumentsUser} from "./user";


type Forgot = {
  "success": boolean,
  "message": "Reset email sent" | string
}

type Reset = {
  "success": true,
  "message": "Password successfully reset" | string
}


export const getForgot = ({email}: ArgumentsUser): Promise<Forgot> => {
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

export const getReset = ({password, token}: ArgumentsUser): Promise<Reset> => {
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