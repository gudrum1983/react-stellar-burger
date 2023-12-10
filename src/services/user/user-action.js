import {authApi} from "../../api/user";
import {openErrorModal} from "../error-modal/error-modal-action";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";


export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});


export const getUser = () => {
  return (dispatch) => {
    return authApi.getUser()
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};

export const updateUser = (email, name, password) => {
  return (dispatch) => {
    return authApi.updateUser(email, name, password)
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    return authApi.logout()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(clearUser());
      });
  };
};

export const login = (pass, email) => {
  return (dispatch) => {
    return authApi.login(pass, email)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch(() => dispatch(openErrorModal("Перепроверьте логин и пароль, Милорд... Пользователь с такими логином и паролем не найден.")));
  };
};

export const register = (name, pass, email) => {
  return (dispatch) => {
    return authApi.register(name, pass, email)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch(() => dispatch(openErrorModal("Перепроверьте данные, Милорд... Данные введены не корректно или такой пользователь уже существуетю")));
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};
