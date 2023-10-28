// В проектной работе эта функция будет обращаться к серверу
// и обновлять токены если они уже устарели.
const getUser = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: {},
      });
    }, 1000);
  });

const login = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        accessToken: "test-token",
        refreshToken: "test-refresh-token",
        user: {},
      });
    }, 1000);
  });

const logout = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });  

export const api = {
  getUser,
  login,
  logout
};
