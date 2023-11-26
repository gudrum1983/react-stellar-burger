import {BASE_URL, ENDPOINTS} from "../utils/config-api";
import {request} from "../utils/config-api";
import {fetchWithRefresh} from "./refresh-token";

export const getOrderDetailsRequest = (ingredientsOrder) => {
  return request(ENDPOINTS.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      ingredients: ingredientsOrder,
    })
  })
};

/*export const getInfoOrderDetailsRequest = (number) => {
debugger
   return (fetch(`${BASE_URL}${ENDPOINTS.orders}/${number}`)
      .then((res)=> {console.log(res)}))


/!*  return request(`${ENDPOINTS.orders}/${number}`)*!/
};*/

export const getInfoOrderDetailsRequest = (number) => {
  return request(`${ENDPOINTS.orders}/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
};