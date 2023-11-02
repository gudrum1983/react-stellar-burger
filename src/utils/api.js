// В проектной работе эта функция будет обращаться к серверу
// и обновлять токены если они уже устарели.
import {getLogin, getRegister} from "../api/config";

const getUser = () =>





  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: {},
      });
    }, 1000);
  });

export const registerApi = (name, pass, email) => getRegister(name, pass, email);

/*export const loginApi = (pass, email) => getLogin(pass, email);*/

const logout = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });  

export const api = {
  getUser,
  logout,
};
